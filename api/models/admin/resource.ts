import { ModelPaginatedCollection, ModelResource } from "@api/utils/models";
import { Admin } from "@shared/types/admin";
import { AdminDocument, AdminModel } from "./types";

export class AdminResource extends ModelResource<
  Admin,
  AdminDocument,
  AdminModel
> {
  protected transform(): Admin {
    return {
      id: this._doc.id,
      email: this._doc.email,
      firstName: this._doc.firstName,
      lastName: this._doc.lastName,
      fullName: this._doc.fullName,
      createdAt: this._doc.createdAt.toJSON(),
      updatedAt: this._doc.updatedAt.toJSON(),
    };
  }
}

export class AdminPaginatedCollection extends ModelPaginatedCollection<
  Admin,
  AdminDocument,
  AdminModel
> {
  protected transform() {
    return this._paginatedDocs.data.map((doc) =>
      new AdminResource(doc).toJSON(),
    );
  }
}
