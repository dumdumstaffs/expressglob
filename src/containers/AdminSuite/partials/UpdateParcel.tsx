import { zodResolver } from "@hookform/resolvers/zod";
import ShipmentSchema from "@shared/schemas/shipment";
import { Shipment } from "@shared/types/shipment";
import { trpc } from "@web/api/trpc";
import Button from "@web/components/Button";
import Input from "@web/components/Input";
import Select from "@web/components/Select";
import {
  parseService,
  shippingServices,
  shippingStatuses,
} from "@web/utils/shipment";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Controller } from "../store";

export const UpdateParcel = ({ shipment }: { shipment: Shipment }) => {
  const updateShipmentMutation = trpc.shipment.update.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<z.input<typeof ShipmentSchema.update>>({
    defaultValues: {
      desc: shipment.desc,
      shipperName: shipment.shipper.name,
      shipperStreetAddress: shipment.shipper.streetAddress,
      shipperAddress: shipment.shipper.address,
      shipperPhone: shipment.shipper.phone,
      shipperEmail: shipment.shipper.email,
      shipperCompany: shipment.shipper.company,
      receiverName: shipment.receiver.name,
      receiverStreetAddress: shipment.receiver.streetAddress,
      receiverAddress: shipment.receiver.address,
      receiverPhone: shipment.receiver.phone,
      receiverEmail: shipment.receiver.email,
      receiverCompany: shipment.receiver.company,
      status: shipment.status,
      shipDate: shipment.shipDate.substring(0, 16),
      scheduledDate: shipment.scheduledDate.slice(0, 16),
      arrivalDate: shipment.arrivalDate?.substring(0, 16),
      weight: shipment.weight,
      dimensions: shipment.dimensions,
      service: shipment.service,
      signature: shipment.signature,
    },
    resolver: zodResolver(ShipmentSchema.update),
  });

  const onSubmit = handleSubmit((data) => {
    updateShipmentMutation.mutate(
      {
        trackingId: shipment.trackingId,
        shipmentData: data,
      },
      {
        onSuccess() {
          Controller.setTab("facts");
        },
      },
    );
  });

  const service = watch("service");
  return (
    <form onSubmit={onSubmit} className="my-12 px-2 sm:px-0">
      <div className="flex space-x-2 mb-4">
        <button
          type="button"
          onClick={() => Controller.setTab("pushLocation")}
          className="border-none px-6 py-2 bg-orange-500 text-white text-sm font-bold"
        >
          Add Location
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
        Description
      </p>
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 mb-12">
        <Input
          label="Description"
          {...register("desc")}
          error={errors.desc?.message}
        />
        <Select
          label="Status"
          {...register("status")}
          error={errors.desc?.message}
        >
          {Object.entries(shippingStatuses).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Select>
      </div>

      <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">
        Shipper Information
      </p>
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 mb-12">
        <Input
          label="Shipper Name"
          {...register("shipperName")}
          error={errors.shipperName?.message}
        />
        <Input
          label="Shipper Company"
          required={false}
          {...register("shipperCompany")}
          error={errors.shipperCompany?.message}
        />
        <Input
          label="Shipper Address"
          {...register("shipperAddress")}
          error={errors.shipperAddress?.message}
        />
        <Input
          label="Shipper Street Address"
          {...register("shipperStreetAddress")}
          error={errors.shipperStreetAddress?.message}
        />
        <Input
          label="Shipper Phone"
          {...register("shipperPhone")}
          error={errors.shipperPhone?.message}
        />
        <Input
          label="Shipper Email"
          required={false}
          {...register("shipperEmail")}
          error={errors.shipperEmail?.message}
        />
      </div>

      <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">
        Receiver Information
      </p>
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 mb-12">
        <Input
          label="Receiver Name"
          {...register("receiverName")}
          error={errors.receiverName?.message}
        />
        <Input
          label="Receiver Company"
          required={false}
          {...register("receiverCompany")}
          error={errors.receiverCompany?.message}
        />
        <Input
          label="Receiver Address"
          {...register("receiverAddress")}
          error={errors.receiverAddress?.message}
        />
        <Input
          label="Receiver Street Address"
          {...register("receiverStreetAddress")}
          error={errors.receiverStreetAddress?.message}
        />
        <Input
          label="Receiver Phone"
          {...register("receiverPhone")}
          error={errors.receiverPhone?.message}
        />
        <Input
          label="Receiver Email"
          required={false}
          {...register("receiverEmail")}
          error={errors.receiverEmail?.message}
        />
      </div>

      <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">Dates</p>
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 mb-12">
        <Input
          label="Ship Date"
          type="datetime-local"
          {...register("shipDate")}
          error={errors.shipDate?.message}
        />
        <Input
          label="Scheduled Date"
          type="datetime-local"
          {...register("scheduledDate")}
          error={errors.scheduledDate?.message}
        />
        <Input
          label="Arrival Date"
          type="datetime-local"
          required={false}
          {...register("arrivalDate")}
          error={errors.arrivalDate?.message}
        />
      </div>

      <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">
        Additional Information
      </p>
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 mb-12">
        <Input
          label="Weight"
          {...register("weight")}
          error={errors.weight?.message}
        />
        <Input
          label="Dimensions"
          {...register("dimensions")}
          error={errors.dimensions?.message}
        />
        <Select
          label="Service"
          {...register("service")}
          error={errors.service?.message}
        >
          {shippingServices.map(({ name, desc }) => (
            <option key={name} value={name}>
              {desc}
            </option>
          ))}
        </Select>
        <p className="text-gray-600 text-xl font-thin p-2 sm:p-4 col-span-2">
          {parseService(service)?.routines}
        </p>

        <div className="mt-2 col-span-2">
          <label className="inline-flex items-center px-2">
            <input
              type="checkbox"
              className="w-6 h-6 rounded"
              {...register("signature")}
            />
            <span className="ml-2">Signature</span>
          </label>
        </div>
      </div>

      <div className="mt-12">
        <Button type="submit" loading={updateShipmentMutation.isLoading}>
          Update
        </Button>
      </div>
    </form>
  );
};
