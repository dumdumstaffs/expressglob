import { ChangeEvent, EventHandler, useEffect } from "react"
import Router from "next/router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@/components/Button"
import Input from "@/components/Input"
import Select from "@/components/Select"
import { parseService, shippingServices } from "@/utils/shipment"
import { useCreateShipmentMutation } from "@/queries/shipments"
import ShipmentSchema, { ShipmentCreateDto } from "@/schemas/shipment"
import { Controller } from "../store"

export const CreateParcel = () => {
    const createShipmentMutation = useCreateShipmentMutation()

    const { handleSubmit, register, formState: { errors }, setFocus, watch } = useForm<ShipmentCreateDto>({
        resolver: yupResolver(ShipmentSchema.create)
    })

    const onSubmit = handleSubmit((data) => {
        createShipmentMutation.mutate(data, {
            onSuccess(data) {
                Router.push({
                    pathname: "/manager/track",
                    query: { trackingId: data.trackingId }
                })
            }
        })
    })

    useEffect(() => {
        setFocus("desc")
    }, [])

    const service = watch("service")

    return (
        <form onSubmit={onSubmit} className="my-12 px-2 sm:px-0">
            <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">Description</p>
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 mb-12">
                <Input label="Description" {...register("desc")} error={errors.desc?.message} />
            </div>

            <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">Shipper Information</p>
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 mb-12">
                <Input label="Shipper Name" {...register("shipperName")} error={errors.shipperName?.message} />
                <Input label="Shipper Company" required={false} {...register("shipperCompany")} error={errors.shipperCompany?.message} />
                <Input label="Shipper Address" {...register("shipperAddress")} error={errors.shipperAddress?.message} />
                <Input label="Shipper Street Address" {...register("shipperStreetAddress")} error={errors.shipperStreetAddress?.message} />
                <Input label="Shipper Phone" {...register("shipperPhone")} error={errors.shipperPhone?.message} />
                <Input label="Shipper Email" required={false} {...register("shipperEmail")} error={errors.shipperEmail?.message} />
            </div>

            <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">Receiver Information</p>
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 mb-12">
                <Input label="Receiver Name" {...register("receiverName")} error={errors.receiverName?.message} />
                <Input label="Receiver Company" required={false} {...register("receiverCompany")} error={errors.receiverCompany?.message} />
                <Input label="Receiver Address" {...register("receiverAddress")} error={errors.receiverAddress?.message} />
                <Input label="Receiver Street Address" {...register("receiverStreetAddress")} error={errors.receiverStreetAddress?.message} />
                <Input label="Receiver Phone" {...register("receiverPhone")} error={errors.receiverPhone?.message} />
                <Input label="Receiver Email" required={false} {...register("receiverEmail")} error={errors.receiverEmail?.message} />
            </div>

            <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">Dates</p>
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 mb-12">
                <Input label="Ship Date" type="datetime-local" {...register("shipDate")} error={errors.shipDate?.message} />
                <Input label="Scheduled Date" type="datetime-local" {...register("scheduledDate")} error={errors.scheduledDate?.message} />
            </div>

            <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">Additional Information</p>
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 mb-12">
                <Input label="Weight" {...register("weight")} error={errors.weight?.message} />
                <Input label="Dimensions" {...register("dimensions")} error={errors.dimensions?.message} />
                <Select label="Service" {...register("service")} error={errors.service?.message} >
                    {
                        shippingServices.map(({ name, desc }) => (
                            <option key={name} value={name}>{desc}</option>
                        ))
                    }
                </Select>
                <p className="text-gray-600 text-xl font-thin p-2 sm:p-4 col-span-2">{parseService(service)?.routines}</p>

                <div className="mt-2 col-span-2">
                    <label className="inline-flex items-center px-2">
                        <input type="checkbox" className="w-6 h-6 rounded" {...register("signature")} />
                        <span className="ml-2">Signature</span>
                    </label>
                </div>
            </div>

            <div className="mt-12">
                <Button type="submit" loading={createShipmentMutation.isLoading}>
                    Create
                </Button>
            </div>
        </form>
    )
}