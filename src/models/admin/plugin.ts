import bcrypt from "bcrypt"
import { NextApiRequest } from "next";
import { CallbackError } from "mongoose"
import { capitalise } from "@/utils/helpers";
import { FilterFields, ModelFilter, ModelPaginate, ModelPlugin } from "@/utils/models";
import { AdminDocument, AdminModel } from "./types";

export class AdminPlugin extends ModelPlugin<AdminDocument, AdminModel> {
    protected applyHooks(): void {
        this.Schema.pre("save", async function (next) {
            try {
                if (this.isModified(["firstName", "lastName"])) {
                    this.firstName = capitalise(this.firstName)
                    this.lastName = capitalise(this.lastName)
                }

                if (this.isModified("password")) {
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(this.password, salt)

                    this.password = hashedPassword
                }
                next()
            } catch (err) {
                next(err as CallbackError)
            }
        })
    }

    protected applyVirtuals(): void {
        this.Schema.virtual("fullName").get(function (this: AdminDocument) {
            return this.firstName + " " + this.lastName
        })
    }

    protected applyMethods(): void {
        this.Schema.methods.validatePassword = async function (this: AdminDocument, passwordAttempt: string) {
            const match = await bcrypt.compare(passwordAttempt, this.password)
            return match
        }
    }

    protected applyQueries(): void {
        this.Schema.query.paginate = function (req: NextApiRequest) {
            const paginator = new ModelPaginate<AdminDocument>(req, this)
            return paginator.paginate()
        }

        this.Schema.query.filter = function (req: NextApiRequest, fields: FilterFields) {
            const filter = new ModelFilter<AdminDocument>(req, this, fields)
            return filter.filter()
        }
    }

    protected applyStatics(): void { }
}