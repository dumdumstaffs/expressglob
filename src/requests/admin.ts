import { AdminCreateDto } from "@/schemas/admin"
import { PaginatedResponse } from "@/types"
import { Admin } from "@/types/admin"
import { request } from "."

export const getAll = async (page: number) => {
    const { data } = await request.get<PaginatedResponse<Admin>>("/api/admins", {
        params: { page }
    })

    return data
}

export const create = async (adminData: AdminCreateDto) => {
    const { data } = await request.post<Admin>("/api/admins", adminData)

    return data
}

export const remove = async (id: string) => {
    await request.delete(`/api/admins/${id}`)
}