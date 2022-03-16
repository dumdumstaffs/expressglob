import { request } from "@/lib/axios"
import { Admin } from "@/types/admin"
import { AdminLoginDto } from "@/schemas/misc/auth"

export const AuthRequests = {
    async login(data: AdminLoginDto) {
        await request.post("/api/auth/login", data)
    },

    async logout() {
        await request.post("/api/auth/logout")
    },

    async getProfile() {
        const { data } = await request.get<Admin>("/api/auth/profile")

        return data
    }
}