import { PaginatedResponse } from "@/types";
import { Admin } from "@/types/admin";
import { AdminDocument, AdminModel } from "./types";

export class AdminResource {
    public static transform(doc: AdminDocument): Admin {
        return {
            id: doc.id,
            email: doc.email,
            firstName: doc.firstName,
            lastName: doc.lastName,
            fullName: doc.fullName,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        }
    }

    public static collection(docs: AdminDocument[]): Admin[] {
        return docs.map(AdminResource.transform)
    }

    public static paginate(paginatedDocs: PaginatedResponse<AdminDocument>): PaginatedResponse<Admin> {
        return { ...paginatedDocs, data: AdminResource.collection(paginatedDocs.data) }
    }

    constructor(private readonly _doc: AdminDocument) { }

    public get() {
        return AdminResource.transform(this._doc)
    }

    public doc() {
        return this._doc
    }

    public raw() {
        return this._doc as InstanceType<AdminModel>
    }
}