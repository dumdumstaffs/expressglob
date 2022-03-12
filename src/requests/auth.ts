import { AdminLoginDto } from "@/schemas/misc/auth"
import { Admin } from "@/types/admin"
import { request } from "."

export const login = async (data: AdminLoginDto) => {
    await request.post("/api/auth/login", data)
}

export const logout = async () => {
    await request.post("/api/auth/logout")
}

export const getProfile = async () => {
    const { data } = await request.get<Admin>("/api/auth/profile")

    return data
}