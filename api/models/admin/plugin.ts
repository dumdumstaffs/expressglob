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
import { capitalise } from "@shared/helpers";
import bcrypt from "bcrypt";
import { CallbackError, Schema } from "mongoose";
import { AdminDocument } from "./types";

export class AdminPlugin extends ModelPlugin<AdminDocument> {
  public static plugin(Schema: Schema<AdminDocument>) {
    return new this(Schema).apply();
  }

  protected applyHooks(): void {
    this.Schema.pre("save", async function (next) {
      try {
        if (this.isModified(["firstName", "lastName"])) {
          this.firstName = capitalise(this.firstName);
          this.lastName = capitalise(this.lastName);
        }

        if (this.isModified("password")) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(this.password, salt);

          this.password = hashedPassword;
        }
        next();
      } catch (err) {
        next(err as CallbackError);
      }
    });
  }

  protected applyVirtuals(): void {
    this.Schema.virtual("fullName").get(function (this: AdminDocument) {
      return this.firstName + " " + this.lastName;
    });
  }

  protected applyMethods(): void {
    this.Schema.methods.validatePassword = async function (
      this: AdminDocument,
      passwordAttempt: string,
    ) {
      const match = await bcrypt.compare(passwordAttempt, this.password);
      return match;
    };
  }

  protected applyQueries(): void {
    // @ts-ignore
    this.Schema.query.paginate = function (query: PaginationQueryParams) {
      // @ts-ignore
      const paginator = new ModelPaginate<AdminDocument>(query, this);
      return paginator.paginate();
    };

    // @ts-ignore
    this.Schema.query.filter = function (
      query: FilterQueryParams,
      fields: FilterExpression<AdminDocument>,
    ) {
      // @ts-ignore
      const filter = new ModelFilter<AdminDocument>(query, fields, this);
      return filter.filter();
    };
  }

  protected applyStatics(): void {}
}
