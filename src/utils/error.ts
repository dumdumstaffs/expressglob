import { ValidationError as YupValidationError } from "yup"

export class AppError extends Error {
    public static ErrorCodes = {
        BadRequest: 400,
        Unauthorized: 401,
        Forbidden: 403,
        NotFound: 404,
        Conflict: 409,
        UnprocessibleEntity: 422,
        ServerError: 500
    } as const

    public status: number
    public passthrough: boolean

    constructor(
        message: string,
        status: typeof AppError.ErrorCodes[keyof typeof AppError.ErrorCodes] = AppError.ErrorCodes.ServerError,
        passthrough: boolean = false
    ) {
        super(message)
        this.status = status
        this.passthrough = passthrough
        Object.setPrototypeOf(this, new.target.prototype)
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
        }
    }
}

export class ValidationError extends AppError {
    constructor(public error: YupValidationError) {
        super("Validation Error", AppError.ErrorCodes.UnprocessibleEntity)
    }

    private parse(err: YupValidationError): { [k: string]: string[] } {
        return err.inner.reduce((errorObj, item) => {
            return { ...errorObj, [item.path]: item.errors }
        }, {})
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
            errors: this.parse(this.error),
        }
    }
}

// Catch decorator to control the type of error a function (mostly service method) throws
export function Catch(error?: AppError, mode: "catch" | "fallback" = "catch") {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value

        descriptor.value = async function (...args: any[]) {
            try {
                return await originalMethod.apply(this, args)
            } catch (err) {
                // bail out early and throw error in the following conditions:

                /** @when default error is provided and is in catch mode */
                if (error && mode === "catch") throw error

                /** @when caught error is an AppError and does not have passthrough flag */
                if (err instanceof AppError && !err.passthrough) throw err

                // thow default error if provided or a generic AppError
                throw error || new AppError("Something went wrong")
            }
        }

        return descriptor
    }
}
