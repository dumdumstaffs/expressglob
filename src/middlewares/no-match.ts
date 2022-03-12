import { NextApiRequest, NextApiResponse } from "next"
import { NoMatchHandler } from "next-connect"

export const NoMatch: NoMatchHandler<NextApiRequest, NextApiResponse> = (req, res) => {
    res.status(404).json({
        status: 404,
        message: "Not found",
    })
}