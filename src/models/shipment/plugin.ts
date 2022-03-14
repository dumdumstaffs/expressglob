import { NextApiRequest } from "next";
import { Schema } from "mongoose"
import { FilterExpression, ModelFilter, ModelPaginate, ModelPlugin } from "@/utils/models";
import { ShipmentDocument } from "./types";

export class ShipmentPlugin extends ModelPlugin<ShipmentDocument> {
    public static plugin(Schema: Schema<ShipmentDocument>) {
        return new this(Schema).apply()
    }

    protected applyHooks(): void { }

    protected applyVirtuals(): void { }

    protected applyMethods(): void { }

    protected applyQueries(): void {
        this.Schema.query.paginate = function (req: NextApiRequest) {
            const paginator = new ModelPaginate<ShipmentDocument>(req, this)
            return paginator.paginate()
        }

        this.Schema.query.filter = function (req: NextApiRequest, fields: FilterExpression<ShipmentDocument>) {
            const filter = new ModelFilter<ShipmentDocument>(req, this, fields)
            return filter.filter()
        }
    }

    protected applyStatics(): void { }
}