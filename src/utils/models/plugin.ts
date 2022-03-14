import { Schema, Model } from "mongoose"

export abstract class ModelPlugin<TDocument, TModel extends Model<TDocument> = Model<TDocument>> {

    constructor(protected readonly Schema: Schema<TDocument, TModel>) { }

    protected abstract applyHooks(): void

    protected abstract applyVirtuals(): void

    protected abstract applyMethods(): void

    protected abstract applyQueries(): void

    protected abstract applyStatics(): void

    public apply() {
        this.applyHooks()
        this.applyVirtuals()
        this.applyMethods()
        this.applyQueries()
        this.applyStatics()
    }
}