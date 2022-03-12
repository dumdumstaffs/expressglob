import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/components/Button"
import Input from "@/components/Input"
import { useCreateAdminMutation } from "@/queries/admin";
import AdminSchema, { AdminCreateDto } from "@/schemas/admin";
import { Controller } from "../store"

export const CreateAdmin = () => {
    const createAdminMutation = useCreateAdminMutation()

    const { handleSubmit, register, formState: { errors }, setFocus } = useForm<AdminCreateDto>({
        resolver: yupResolver(AdminSchema.create)
    })

    const onSubmit = handleSubmit((data) => {
        createAdminMutation.mutate(data, {
            onSuccess() {
                Controller.toggleCreateAdmin()
                Controller.setTab("admins")
            }
        })
    })

    useEffect(() => {
        setFocus("email")
    }, [])

    return (
        <div className="border-solid border-0 border-b border-gray-200 pb-12 px-1 sm:px-0">
            <div className="flex justify-end items-center my-8 mx-auto sm:w-[70%]">
                <button
                    className="appearance-none border-none outline-none bg-transparent"
                    aria-label="Close track another shipment."
                    onClick={Controller.toggleCreateAdmin}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                        className="w-6 h-6"
                    >
                        <desc>Created with Fabric.js 1.7.22</desc>
                        <defs></defs>
                        <g transform="translate(128 128) scale(0.72 0.72)" style={{}}>
                            <g
                                style={{
                                    stroke: "none",
                                    strokeWidth: 0,
                                    strokeDasharray: "none",
                                    strokeLinecap: "butt",
                                    strokeLinejoin: "miter",
                                    strokeMiterlimit: 10,
                                    fill: "none",
                                    fillRule: "nonzero",
                                    opacity: 1
                                }}
                                transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)"
                            >
                                <path
                                    d="M 3 90 c -0.768 0 -1.536 -0.293 -2.121 -0.879 c -1.172 -1.171 -1.172 -3.071 0 -4.242 l 84 -84 c 1.172 -1.172 3.07 -1.172 4.242 0 c 1.172 1.171 1.172 3.071 0 4.242 l -84 84 C 4.536 89.707 3.768 90 3 90 z"
                                    style={{
                                        stroke: "none",
                                        strokeWidth: 1,
                                        strokeDasharray: "none",
                                        strokeLinecap: "butt",
                                        strokeLinejoin: "miter",
                                        strokeMiterlimit: 10,
                                        fill: "rgb(0,0,0)",
                                        fillRule: "nonzero",
                                        opacity: 1
                                    }}
                                    transform=" matrix(1 0 0 1 0 0) "
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M 87 90 c -0.768 0 -1.535 -0.293 -2.121 -0.879 l -84 -84 c -1.172 -1.171 -1.172 -3.071 0 -4.242 c 1.171 -1.172 3.071 -1.172 4.242 0 l 84 84 c 1.172 1.171 1.172 3.071 0 4.242 C 88.535 89.707 87.768 90 87 90 z"
                                    style={{
                                        stroke: "none",
                                        strokeWidth: 1,
                                        strokeDasharray: "none",
                                        strokeLinecap: "butt",
                                        strokeLinejoin: "miter",
                                        strokeMiterlimit: 10,
                                        fill: "rgb(0,0,0)",
                                        fillRule: "nonzero",
                                        opacity: 1
                                    }}
                                    transform=" matrix(1 0 0 1 0 0) "
                                    strokeLinecap="round"
                                />
                            </g>
                        </g>
                    </svg>

                </button>
            </div>
            <form onSubmit={onSubmit} className="tw-form">
                <h2 className="text-center text-xl font-thin sm:mx-[75px] mt-[20px] mb-[25px]">
                    Enter up to 30 of your FedEx tracking, door tag, or FedEx Office
                    order numbers (one per line).
                </h2>
                <Input label="Email" {...register("email")} error={errors.email?.message} />
                <Input label="First Name" {...register("firstName")} error={errors.firstName?.message} />
                <Input label="Last Name" {...register("lastName")} error={errors.lastName?.message} />
                <Input label="Password" type="password" {...register("password")} error={errors.password?.message} />
                <Input label="Confirm Password" type="password" {...register("confirmPassword")} error={errors.confirmPassword?.message} />

                <p className="text-red-400 !my-6 text-center">{createAdminMutation.isError && createAdminMutation.axiosError?.response.data.message}</p>

                <div className="text-right">
                    <Button type="submit" loading={createAdminMutation.isLoading}>Create New</Button>
                </div>
            </form>
        </div>
    )
}