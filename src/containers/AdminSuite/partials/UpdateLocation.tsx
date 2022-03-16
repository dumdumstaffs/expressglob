import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@/components/Button"
import Input from "@/components/Input"
import { useUpdateShipmentLocationMutation, useRemoveShipmentLocationMutation } from "@/queries/shipments"
import ShipmentSchema, { ShipmentUpdateLocationDto } from "@/schemas/shipment"
import { Controller } from "../store"
import { Shipment } from "@/types/shipment"

export const UpdateLocation = ({ shipment, locationId }: { shipment: Shipment, locationId: string }) => {
    const updateShipmentLocationMutation = useUpdateShipmentLocationMutation(shipment.trackingId, locationId)
    const removeShipmentLocationMutation = useRemoveShipmentLocationMutation(shipment.trackingId, locationId)

    const location = shipment.locations.find(l => l.id === locationId)

    const { handleSubmit, register, formState: { errors } } = useForm<ShipmentUpdateLocationDto>({
        defaultValues: {
            address: location?.address,
            comment: location?.comment,
            date: location?.date.substring(0, 16),
        },
        resolver: yupResolver(ShipmentSchema.pushLocation)
    })

    const onSubmit = handleSubmit((data) => {
        updateShipmentLocationMutation.mutate(data, {
            onSuccess() {
                Controller.setTab("history")
            }
        })
    })

    const onRemove = () => {
        removeShipmentLocationMutation.mutate(null, {
            onSuccess() {
                Controller.setTab("history")
            }
        })
    }

    return (
        <form onSubmit={onSubmit} className="my-12 px-2 sm:px-0">
            <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">Update Shipment History Details</p>
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 mb-12">
                <Input label="Address" {...register("address")} error={errors.address?.message} />
                <Input label="Comment" {...register("comment")} error={errors.comment?.message} />
                <Input label="Date" type="datetime-local"  {...register("date")} error={errors.date?.message} />
            </div>

            <div className="mt-12">
                <Button type="submit" loading={updateShipmentLocationMutation.isLoading}>
                    Update Location
                </Button>
            </div>
            <div className="mt-12">
                <RemoveLocation onRemove={onRemove} loading={removeShipmentLocationMutation.isLoading} />
            </div>
        </form>
    )
}

const RemoveLocation = ({ onRemove, loading }: { onRemove: () => void, loading: boolean }) => {
    const [state, setState] = useState({ loading: false, allow: false })

    const confirm = () => {
        setState({ loading: true, allow: false })

        setTimeout(() => {
            setState({ loading: false, allow: true })
        }, 800)
    }

    const cancel = () => setState({ loading: false, allow: false })

    const remove = () => onRemove()

    return (
        <>
            <button onClick={state.allow ? remove : confirm} className="px-12 py-2 inline-block bg-red-500 border-solid border-1 border-red-500 w-full sm:w-auto text-white font-semibold rounded appearance-none outline-none" type="button">
                {loading ? "Removing..." : state.loading ? "Please wait..." : state.allow ? "Confirm Delete" : "Delete"}
            </button>
            {
                state.allow && (
                    <button onClick={cancel} className="px-12 py-2 mt-4 sm:ml-4 sm:mt-0 inline-block bg-white border-solid border-1 border-gray-200 text-gray-500 w-full sm:w-auto font-semibold rounded appearance-none outline-none" type="button">
                        Cancel
                    </button>
                )
            }

        </>

    )
}