import { HttpError, InternalServerError } from "http-errors"
import { ValidationError as YupValidationError } from "yup"

export class CustomError extends Error {
    public status: number

    /** errors with passthrough set as "true" will not be thrown by @Safe Decorator */
    public passthrough: boolean

    constructor(message: string, status = 500, passthrough = false) {
        super(message)
        this.status = status
        this.passthrough = passthrough
        Object.setPrototypeOf(this, new.target.prototype)
    }
    get customMessage() {
        return this.message
    }
}

export class ValidationError extends CustomError {
    public errors: { [k: string]: string[] }

    constructor(public error: YupValidationError) {
        super("Validation Error", 422)
        this.errors = this.parse(error)
    }

    private parse(err: YupValidationError): { [k: string]: string[] } {
        return err.inner.reduce((errorObj, item) => {
            return { ...errorObj, [item.path]: item.errors }
        }, {})
    }

    toJson() {
        return {
            status: this.status,
            message: this.message,
            errors: this.errors,
        }
    }
}

// Catch decorator to control the type of error a function (mostly service method) throws
export function Catch(error?: HttpError, mode: "catch" | "fallback" = "catch") {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value

        descriptor.value = async function (...args: any[]) {
            try {
                return await originalMethod.apply(this, args)
            } catch (err) {
                // bail out early and throw error in the following conditions:

                /** @when default error is provided and is in catch mode */
                if (error && mode === "catch") throw error

                /** @when caught error is a CustomError and does not have passthrough flag */
                if (err instanceof CustomError && !err.passthrough) throw err

                /** @when caught error is an HttpError */
                if (err instanceof HttpError) throw err

                // thow default error if provided or a generic error
                throw error || new InternalServerError("Something went wrong")
            }
        }

        return descriptor
    }
}
