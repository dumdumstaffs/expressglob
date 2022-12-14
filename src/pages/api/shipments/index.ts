import { Controller, handle, Route } from "@/utils/handler";
import type { TypedRequest, TypedResponse } from "@/types/request";
import { admin } from "@/middlewares/admin";
import ShipmentService from "@/services/shipment";
import ShipmentSchema from "@/schemas/shipment";
import { ShipmentPaginatedCollection, ShipmentResource } from "@/models/shipment";

@Controller()
class Handler {
    constructor(private readonly shipmentService: ShipmentService) { }

    @Route(null, admin)
    async get(req: TypedRequest, res: TypedResponse<ShipmentPaginatedCollection>) {
        // await new Promise(r => setTimeout(r, 4000))

        const shipments = await this.shipmentService.getAll(req)

        res.json(shipments)
    }

    @Route(ShipmentSchema.create, admin)
    async post(req: TypedRequest<typeof ShipmentSchema.create>, res: TypedResponse<ShipmentResource>) {
        const shipment = await this.shipmentService.create(req.validated)

        res.json(shipment)
    }
}

export default handle(Handler)