import {
  Admin,
  AdminPaginatedCollection,
  AdminResource,
} from "@api/models/admin";
import {
  FilterQueryParams,
  PaginationQueryParams,
} from "@api/utils/models/query";
import AdminSchema from "@shared/schemas/admin";
import { z } from "zod";

export class AdminService {
  public async getAll(page: PaginationQueryParams, filter: FilterQueryParams) {
    const admins = await Admin.find()
      .sort("-createdAt")
      .filter(filter, "email")
      .paginate(page);

    return new AdminPaginatedCollection(admins);
  }

  public async findById(id: string, password?: string) {
    const admin = await Admin.findById(id);
    if (!admin) return null;

    if (password !== undefined) {
      const validPassword = await admin.validatePassword(password);
      if (!validPassword) return null;
    }
    return new AdminResource(admin);
  }

  public async findByEmail(email: string, password?: string) {
    const admin = await Admin.findOne({ email });
    if (!admin) return null;

    if (password !== undefined) {
      const validPassword = await admin.validatePassword(password);
      if (!validPassword) return null;
    }
    return new AdminResource(admin);
  }

  public async create(adminCreateData: z.infer<typeof AdminSchema.create>) {
    const existingUser = await this.findByEmail(adminCreateData.email);
    if (existingUser) return null;

    const { confirmPassword, ...adminData } = adminCreateData;

    const admin = await Admin.create(adminData);

    return new AdminResource(admin);
  }

  public async remove(id: string) {
    const admin = await this.findById(id);
    if (!admin) return null;

    await admin.raw().remove();
    return id;
  }
}
