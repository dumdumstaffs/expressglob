import * as yup from "yup"

export default class AdminSchema {
    public static create: yup.SchemaOf<AdminCreateDto> = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required().min(8, "Password must be at least 8 characters"),
        confirmPassword: yup.string().required().oneOf([yup.ref("password")], "Passwords must match"),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
    })
}

export interface AdminCreateDto {
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
}