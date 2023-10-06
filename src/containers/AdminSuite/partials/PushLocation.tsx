import { zodResolver } from "@hookform/resolvers/zod";
import ShipmentSchema from "@shared/schemas/shipment";
import { Shipment } from "@shared/types/shipment";
import { trpc } from "@web/api/trpc";
import Button from "@web/components/Button";
import Input from "@web/components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Controller } from "../store";

export const PushLocation = ({ shipment }: { shipment: Shipment }) => {
  const pushShipmentLocationMutation = trpc.shipment.addLocation.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.input<typeof ShipmentSchema.pushLocation>>({
    resolver: zodResolver(ShipmentSchema.pushLocation),
  });

  const onSubmit = handleSubmit((data) => {
    pushShipmentLocationMutation.mutate(
      {
        trackingId: shipment.trackingId,
        locationData: data,
      },
      {
        onSuccess() {
          Controller.setTab("history");
        },
      },
    );
  });

  return (
    <form onSubmit={onSubmit} className="my-12 px-2 sm:px-0">
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
          onClick={() => Controller.setTab("images")}
          className="border-none px-6 py-2 bg-orange-500 text-white text-sm font-bold"
        >
          Manage Images
        </button>
      </div>
      <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">
        New Shipment History Details
      </p>
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 mb-12">
        <Input
          label="Address"
          {...register("address")}
          error={errors.address?.message}
        />
        <Input
          label="Comment"
          {...register("comment")}
          error={errors.comment?.message}
        />
        <Input
          label="Date"
          {...register("date")}
          type="datetime-local"
          error={errors.date?.message}
        />
      </div>

      <div className="mt-12">
        <Button type="submit" loading={pushShipmentLocationMutation.isLoading}>
          Add Location
        </Button>
      </div>
    </form>
  );
};
