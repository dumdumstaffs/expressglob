import { PaginatedResponse } from "@shared/types/pagination";
import { Query } from "mongoose";
import { PaginationQueryParams } from "./query";

export class ModelPaginate<T> {
  private query: PaginationQueryParams;
  private instance: Query<T[], T>;
  private instanceConstructor: new (...args: any) => Query<T[], T>;

  constructor(query: PaginationQueryParams, instance: Query<T[], T>) {
    this.query = query;
    this.instance = instance;
    this.instanceConstructor = instance.toConstructor();
  }

  paginate() {
    // return raw query if paginate is explicitly disabled
    if (this.shouldSkipPagination()) return Promise.resolve(this.instance);

    return this.getPaginatedData();
  }

  shouldSkipPagination() {
    return this.query.paginate === "false";
  }

  async getPaginatedData(): Promise<PaginatedResponse<T>> {
    const page = Math.abs(this.query.page ?? 1);
    const limit = Math.abs(this.query.limit ?? 10);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const total = await new this.instanceConstructor().countDocuments();
    const data = await new this.instanceConstructor()
      .limit(limit)
      .skip(startIndex);

    // build paginated results
    return {
      data,
      page,
      limit,
      total,
      cursor: {
        next: endIndex < total ? page + 1 : null,
        prev: startIndex > 0 ? page - 1 : null,
      },
    };
  }
}
