import { NextApiRequest, NextApiResponse } from "next"
import { ErrorHandler } from "next-connect"
import { CustomError, ValidationError } from "@/utils/error"

export const Error: ErrorHandler<NextApiRequest, NextApiResponse> = (err, req, res, next) => {

    if (err instanceof ValidationError) {
        return res.status(422).send(err.toJson())
    }
    if (err instanceof CustomError) {
        return res.status(err.status).send(err.message)
    }
    res.status(err?.status || 500).json({
        status: err?.status || 500,
        message: err?.message || "Something went wrong",
    })
}