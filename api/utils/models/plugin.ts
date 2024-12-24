import { Model, Schema } from "mongoose";

export abstract class ModelPlugin<
  TDocument,
  TModel extends Model<any> = Model<TDocument>,
  TInstanceMethods = {},
  TQueryHelpers = {},
  TVirtuals = {},
  TStaticMethods = {},
> {
  constructor(
    protected readonly Schema: Schema<
      TDocument,
      TModel,
      TInstanceMethods,
      TQueryHelpers,
      TVirtuals,
      TStaticMethods
    >,
  ) {}

  protected abstract applyHooks(): void;

  protected abstract applyVirtuals(): void;

  protected abstract applyMethods(): void;

  protected abstract applyQueries(): void;

  protected abstract applyStatics(): void;

  public apply() {
    this.applyHooks();
    this.applyVirtuals();
    this.applyMethods();
    this.applyQueries();
    this.applyStatics();
  }
}
