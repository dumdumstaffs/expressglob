import axios from "axios"
import { useState } from "react"
import PaginatedLinks from "@/components/PaginationLinks"
import { Loader, LoaderError } from "@/components/Loader"
import { useAdmins, useRemoveAdminMutation } from "@/queries/admin"
import { Admin } from "@/types/admin"

export const AdminList = () => {
    const { query, page, next, prev, hasMore } = useAdmins()

    return (
        <div className="my-12 px-2 sm:px-0">
            <div className="hidden sm:!flex justify-between rounded-lg items-center px-2 mb-4 bg-fedex-bg text-gray-700">
                <p className="text-xs font-bold m-0 py-2 pl-4 sm:w-4/12">Email</p>
                <p className="text-xs font-bold m-0 py-2 sm:w-2/12">First Name</p>
                <p className="text-xs font-bold m-0 py-2 sm:w-2/12">Last name</p>
                <p className="text-xs font-bold m-0 py-2 sm:w-2/12">Role</p>
                <p className="text-xs font-bold m-0 py-2 sm:w-2/12"></p>
            </div>
            <div className="space-y-4">
                {
                    query.isLoading ? (
                        <Loader size="small" />
                    ) : query.isError ? (
                        <LoaderError size="small" message="Unable to load admins" />
                    ) : query.isSuccess && (
                        <>
                            {query.data?.data.map((admin) => (
                                <div key={admin.id} className={query.isPreviousData ? "opacity-40 pointer-events-none" : undefined}>
                                    <AdminItem admin={admin} />
                                </div>
                            ))}
                            <PaginatedLinks
                                page={page}
                                total={query.data.total}
                                limit={query.data.limit}
                                hasMore={hasMore}
                                next={next}
                                prev={prev}
                            />
                        </>
                    )
                }
            </div>
        </div>
    )
}

const AdminItem = ({ admin }: { admin: Admin }) => {
    const removeAdminMutation = useRemoveAdminMutation()

    const [state, setState] = useState({ loading: false, allow: false, error: "" })

    const confirm = () => {
        setState(s => ({ ...s, loading: true }))

        setTimeout(() => {
            setState(s => ({ ...s, loading: false, allow: true }))
        }, 800)
    }

    const cancel = () => setState(s => ({ ...s, allow: false }))

    const resetError = () => setState(s => ({ ...s, error: "" }))

    const remove = async (id: string) => {
        removeAdminMutation.mutate(id, {
            onSuccess() {
                setState(s => ({ ...s, allow: false }))
            },

            onError(err) {
                let message: string

                if (axios.isAxiosError(err)) {
                    message = err.response.data.message
                } else message = "Something went wrong"

                setState(s => ({ ...s, error: message }))
            },
        })
    }

    return (
        <div
            className={`
                flex flex-col sm:flex-row justify-between items-start text-left sm:items-center
                p-2 rounded-lg cursor-pointer
                text-gray-600 bg-fedex-light border-solid border-2 border-fedex-light hover:border-fedex-bg
            `}
        >
            <p className="tracking-wide text-sm text-gray-700 font-bold m-0 py-1 sm:py-3 sm:pl-4 sm:w-4/12">{admin.email}</p>
            <p className="m-0 py-1 sm:py-3 w-full sm:w-2/12 flex items-center justify-between sm:block">
                <span className="sm:hidden text-xs font-bold">First Name:</span>
                <span className="tracking-wide text-xs font-bold">{admin.firstName}</span>
            </p>
            <p className="m-0 py-1 sm:py-3 w-full sm:w-2/12 flex items-center justify-between sm:block">
                <span className="sm:hidden text-xs font-bold">Last Name:</span>
                <span className="tracking-wide text-xs font-bold uppercase">{admin.lastName}</span>
            </p>
            <p className={`m-0 py-1 sm:py-3 w-full sm:w-2/12 ${state.allow ? "sm:hidden" : "sm:flex"} flex items-center justify-between sm:block`}>
                <span className="sm:hidden text-xs font-bold">Role:</span>
                <span className="tracking-wide text-xs font-bold">Admin</span>
            </p>
            {
                true && (
                    <div className={`mt-3 sm:m-0 py-1 sm:py-3 w-full ${state.allow ? "sm:w-4/12" : "sm:w-2/12"} flex items-center justify-between sm:block`}>
                        <span className="sm:hidden text-xs font-bold"></span>
                        <div className="relative flex justify-end items-center space-x-3">
                            {
                                state.allow && (
                                    <button onClick={cancel} className="bg-white border-solid border-1 border-gray-200 px-4 py-2 rounded tracking-wide text-xs font-bold">
                                        Cancel
                                    </button>
                                )
                            }
                            <button onClick={state.allow ? () => remove(admin.id) : confirm} className={`${state.allow ? "bg-red-600" : "bg-fedex"} text-white border-none px-4 py-2 rounded tracking-wide text-xs font-bold`}>
                                {state.loading ? "Please wait..." : state.allow ? removeAdminMutation.isLoading ? "Removing..." : "Confirm Delete" : "Delete"}
                            </button>
                            {
                                state.error && (
                                    <p onClick={resetError} className="absolute rounded pl-2 pr-8 py-2 bottom-0 right-0 text-xs bg-white border-solid border-1 border-red-100">
                                        <span className="absolute top-1 right-1 h-4 w-4 flex justify-center items-center overflow-hidden rounded-full bg-gray-100 text-gray-400 font-bold">x</span>
                                        {state.error}
                                    </p>
                                )
                            }

                        </div>
                    </div>
                )
            }

        </div>
    )
}