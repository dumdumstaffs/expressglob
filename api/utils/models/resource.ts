import { PaginatedResponse } from "@shared/types/pagination";
import { Model, Types } from "mongoose";

// Resources

export abstract class ModelResource<
  T,
  TDocument,
  TModel extends Model<TDocument> = Model<TDocument>,
> {
  constructor(protected readonly _doc: InstanceType<TModel>) {}

  protected abstract transform(): T;

  public json(): T {
    return this.transform();
  }

  public toJSON(): T {
    return this.transform();
  }

  public doc() {
    return this._doc as TDocument;
  }

  public raw() {
    return this._doc;
  }
}

export abstract class ModelSubDocumentResource<
  T,
  TDocument = T,
  IdType = Types.ObjectId,
> {
  constructor(protected readonly _doc: Types.Subdocument<IdType> & TDocument) {}

  protected abstract transform(): T;

  public toJSON() {
    return this.transform();
  }

  public doc() {
    return this._doc;
  }
}

// Colllections

export abstract class ModelCollection<
  T,
  TDocument,
  TModel extends Model<TDocument> = Model<TDocument>,
> {
  constructor(protected readonly _docs: InstanceType<TModel>[]) {}

  protected abstract transform(): T[];

  public toJSON() {
    return this.transform();
  }
}

export abstract class ModelPaginatedCollection<
  T,
  TDocument,
  TModel extends Model<TDocument> = Model<TDocument>,
> {
  constructor(
    protected readonly _paginatedDocs: PaginatedResponse<InstanceType<TModel>>,
  ) {}

  protected abstract transform(): T[];

  public toJSON(): PaginatedResponse<T> {
    return { ...this._paginatedDocs, data: this.transform() };
  }
}

export abstract class ModelSubdocumentCollection<T, TDocument> {
  constructor(protected readonly _docs: Types.DocumentArray<TDocument>) {}

  protected abstract transform(): T[];

  public toJSON() {
    return this.transform();
  }
}

export abstract class ModelSubdocumentPaginatedCollection<T, TDocument> {
  constructor(
    protected readonly _paginatedDocs: PaginatedResponse<
      Types.DocumentArray<TDocument>[number]
    >,
  ) {}

  protected abstract transform(): T[];

  public toJSON(): PaginatedResponse<T> {
    return { ...this._paginatedDocs, data: this.transform() };
  }
}
