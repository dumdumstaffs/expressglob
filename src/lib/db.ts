import mongoose from "mongoose"
import { config } from "@/utils/config"

let connection: number

export const connectDb = () => {
    if (connection) {
        console.log("Mongoose reusing connection")
        return Promise.resolve()
    }

    return mongoose
        .connect(config.database.URI)
        .then((db) => {
            console.log("Mongoose connected")

            connection = db.connections[0].readyState
        })
        .catch((err) => {
            console.log("Mongoose error", err.message)
        })
}