import * as yup from "yup"

export default class AuthSchema {
    public static login: yup.SchemaOf<AdminLoginDto> = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
    })
}

export interface AdminLoginDto {
    email: string
    password: string
}