import { AnyObjectSchema, ValidationError as YupValidationError } from "yup"
import { ValidationError } from "@/utils/error"
import { Middleware } from "@/utils/handler"

export const validate = (schema: AnyObjectSchema): Middleware<{ validated: {} }> =>
    async (req, res, next) => {
        try {
            // validate request body
            const validated = await schema.typeError("request body empty").validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            })

            // modify request body
            req.validated = validated
            next()
        } catch (err) {
            if (err instanceof YupValidationError) {
                return next(new ValidationError(err))
            }
            next(err)
        }
    }
