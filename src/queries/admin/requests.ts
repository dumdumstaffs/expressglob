import { request } from "@/lib/axios"
import { PaginatedResponse } from "@/types"
import { Admin } from "@/types/admin"
import { AdminCreateDto } from "@/schemas/admin"

export const AdminRequests = {
    async getAll(page: number) {
        const { data } = await request.get<PaginatedResponse<Admin>>("/api/admins", {
            params: { page }
        })

        return data
    },

    async create(adminData: AdminCreateDto) {
        const { data } = await request.post<Admin>("/api/admins", adminData)

        return data
    },

    async remove(id: string) {
        await request.delete(`/api/admins/${id}`)
    }
}