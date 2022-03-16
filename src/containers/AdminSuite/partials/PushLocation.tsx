import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@/components/Button"
import Input from "@/components/Input"
import { usePushShipmentLocationMutation } from "@/queries/shipments"
import ShipmentSchema, { ShipmentPushLocationDto } from "@/schemas/shipment"
import { Controller } from "../store"
import { Shipment } from "@/types/shipment"

export const PushLocation = ({ shipment }: { shipment: Shipment }) => {
    const pushShipmentLocationMutation = usePushShipmentLocationMutation(shipment.trackingId)

    const { handleSubmit, register, formState: { errors } } = useForm<ShipmentPushLocationDto>({
        resolver: yupResolver(ShipmentSchema.pushLocation)
    })

    const onSubmit = handleSubmit((data) => {
        pushShipmentLocationMutation.mutate(data, {
            onSuccess() {
                Controller.setTab("history")
            }
        })
    })

    return (
        <form onSubmit={onSubmit} className="my-12 px-2 sm:px-0">
            <div className="flex space-x-2 mb-4">
                <button type="button" onClick={() => Controller.setTab("update")} className="border-none px-6 py-2 bg-orange-500 text-white text-sm font-bold">
                    Update
                </button>
                <button type="button" onClick={() => Controller.setTab("images")} className="border-none px-6 py-2 bg-orange-500 text-white text-sm font-bold">
                    Manage Images
                </button>
            </div>
            <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">New Shipment History Details</p>
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 mb-12">
                <Input label="Address" {...register("address")} error={errors.address?.message} />
                <Input label="Comment" {...register("comment")} error={errors.comment?.message} />
                <Input label="Date" type="datetime-local"  {...register("date")} error={errors.date?.message} />
            </div>

            <div className="mt-12">
                <Button type="submit" loading={pushShipmentLocationMutation.isLoading}>
                    Add Location
                </Button>
            </div>
        </form>
    )
}