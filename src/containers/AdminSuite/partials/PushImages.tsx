import { Shipment } from "@shared/types/shipment";
import { trpc } from "@web/api/trpc";
import Button from "@web/components/Button";
import { clientConfig } from "@web/utils/config";
import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";
import { Controller } from "../store";

export const PushImages = ({ shipment }: { shipment: Shipment }) => {
  const pushShipmentImageMutation = trpc.shipment.addImage.useMutation();

  const fileRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<{
    loading: boolean;
    file?: File;
    error?: string;
  }>({
    loading: false,
    file: undefined,
    error: undefined,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((s) => ({ ...s, file: e.target.files?.[0], error: undefined }));
  };

  const handleSubmit = async () => {
    setState((s) => ({ ...s, error: undefined }));
    if (!state.file) {
      return setState((s) => ({ ...s, error: "Please choose a file" }));
    }

    try {
      setState((s) => ({ ...s, loading: true }));

      const formData = new FormData();
      formData.append("file", state.file);
      formData.append("upload_preset", clientConfig.cloudinary.uploadPreset);

      const { data } = await axios.post<{
        public_id: string;
        secure_url: string;
      }>(clientConfig.cloudinary.publicUrl, formData);

      pushShipmentImageMutation.mutate({
        trackingId: shipment.trackingId,
        imageData: {
          url: data.secure_url,
          cloudId: data.public_id,
        },
      });

      setState((s) => ({ ...s, file: undefined, loading: false }));
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error: "Something went wrong",
      }));
    }
  };

  return (
    <div className="my-12 px-2 sm:px-0">
      <div className="flex space-x-2 mb-4">
        <button
          type="button"
          onClick={() => Controller.setTab("update")}
          className="border-none px-6 py-2 bg-orange-500 text-white text-sm font-bold"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => Controller.setTab("pushLocation")}
          className="border-none px-6 py-2 bg-orange-500 text-white text-sm font-bold"
        >
          Add Location
        </button>
      </div>

      <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">
        Manage Images
      </p>
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 mb-12">
        {shipment.images.map((image) => (
          <div key={image.id} className="flex flex-col space-y-4">
            <img alt="" className="h-48 object-cover" src={image.url} />
            <RemoveImage trackingId={shipment.trackingId} imageId={image.id} />
          </div>
        ))}
      </div>

      <div
        onClick={() => fileRef.current?.click()}
        className={`${
          state.error
            ? "bg-red-100"
            : state.file
            ? "bg-orange-100"
            : "bg-gray-100"
        } ${
          state.loading ? "animate-pulse" : ""
        } flex items-center px-6 py-8 text-ellipsis cursor-pointer overflow-clip max-w-md rounded text-sm font-bold text-gray-600`}
      >
        {state.error || (state.file ? state.file.name : "Select an Image")}
      </div>
      <input
        ref={fileRef}
        onChange={handleChange}
        className="hidden"
        type="file"
      />

      <div className="mt-12">
        <Button
          type="button"
          onClick={handleSubmit}
          loading={pushShipmentImageMutation.isLoading || state.loading}
        >
          Upload Image
        </Button>
      </div>
    </div>
  );
};

const RemoveImage = ({
  trackingId,
  imageId,
}: {
  trackingId: string;
  imageId: string;
}) => {
  const removeShipmentImageMutation = trpc.shipment.removeImage.useMutation();

  const [state, setState] = useState({ loading: false, allow: false });

  const confirm = () => {
    setState({ loading: true, allow: false });

    setTimeout(() => {
      setState({ loading: false, allow: true });
    }, 800);
  };

  const cancel = () => setState({ loading: false, allow: false });

  const handleRemove = () => {
    removeShipmentImageMutation.mutate({ trackingId, imageId });
  };

  return (
    <>
      <button
        onClick={state.allow ? handleRemove : confirm}
        className="px-12 py-2 inline-block bg-gray-200 border-solid border-1 border-gray-200 text-gray-500 font-semibold rounded appearance-none outline-none"
        type="button"
      >
        {removeShipmentImageMutation.isLoading
          ? "Removing..."
          : state.loading
          ? "Please wait..."
          : state.allow
          ? "Confirm Delete"
          : "Delete"}
      </button>
      {state.allow && (
        <button
          onClick={cancel}
          className="px-12 py-2 mt-4 sm:mt-0 inline-block bg-white border-solid border-1 border-gray-200 text-gray-500 w-full sm:w-auto font-semibold rounded appearance-none outline-none"
          type="button"
        >
          Cancel
        </button>
      )}
    </>
  );
};
