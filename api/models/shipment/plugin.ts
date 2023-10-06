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
    this.Schema.query.paginate = function (query: PaginationQueryParams) {
      const paginator = new ModelPaginate<ShipmentDocument>(query, this);
      return paginator.paginate();
    };

    this.Schema.query.filter = function (
      query: FilterQueryParams,
      fields: FilterExpression<ShipmentDocument>,
    ) {
      const filter = new ModelFilter<ShipmentDocument>(query, fields, this);
      return filter.filter();
    };
  }

  protected applyStatics(): void {}
}
