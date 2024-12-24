import {
  FilterExpression,
  ModelFilter,
  ModelPaginate,
  ModelPlugin,
} from "@api/utils/models";
import {
  FilterQueryParams,
  PaginationQueryParams,
} from "@api/utils/models/query";
import { Schema } from "mongoose";
import { ShipmentDocument } from "./types";

export class ShipmentPlugin extends ModelPlugin<ShipmentDocument> {
  public static plugin(Schema: Schema<ShipmentDocument>) {
    return new this(Schema).apply();
  }

  protected applyHooks(): void {}

  protected applyVirtuals(): void {}

  protected applyMethods(): void {}

  protected applyQueries(): void {
    // @ts-ignore
    this.Schema.query.paginate = function (query: PaginationQueryParams) {
      // @ts-ignore
      const paginator = new ModelPaginate<ShipmentDocument>(query, this);
      return paginator.paginate();
    };

    // @ts-ignore
    this.Schema.query.filter = function (
      query: FilterQueryParams,
      fields: FilterExpression<ShipmentDocument>,
    ) {
      // @ts-ignore
      const filter = new ModelFilter<ShipmentDocument>(query, fields, this);
      return filter.filter();
    };
  }

  protected applyStatics(): void {}
}
