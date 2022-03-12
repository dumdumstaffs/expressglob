import { NextApiRequest, NextApiResponse } from "next"
import * as yup from "yup"
import { AdminDocument } from "@/models/admin"

export type TypedRequest<
    Schema extends yup.AnyObjectSchema | null = yup.AnyObjectSchema,
    Params extends { [key: string]: string } = Record<string, string>
    > = NextApiRequest & {
        validated: yup.InferType<Schema extends yup.AnyObjectSchema ? Schema : yup.AnyObjectSchema>,
        query: Params,
        admin?: AdminDocument
    }

export type TypedResponse<
    Body extends Record<string, any> = { message: string }
    > = NextApiResponse<Body>