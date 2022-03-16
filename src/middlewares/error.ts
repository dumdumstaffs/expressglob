import { NextApiRequest, NextApiResponse } from "next"
import { ErrorHandler } from "next-connect"
import { AppError, ValidationError } from "@/utils/error"

export const Error: ErrorHandler<NextApiRequest, NextApiResponse> = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(err.status).send(err)
    }
    if (err instanceof AppError && !err.passthrough) {
        return res.status(err.status).send(err)
    }
    res.status(500).json({
        status: 500,
        message: "Something went wrong",
    })
}