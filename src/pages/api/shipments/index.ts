import { Controller, handle, Route } from "@/utils/handler";
import { admin } from "@/middlewares/admin";
import ShipmentService from "@/services/shipment";
import ShipmentSchema from "@/schemas/shipment";
import { PaginatedResponse } from "@/types";
import { TypedRequest, TypedResponse } from "@/types/request";
import { Shipment } from "@/types/shipment";

@Controller()
class Handler {
    constructor(private readonly shipmentService: ShipmentService) { }

    @Route(null, admin)
    async get(req: TypedRequest, res: TypedResponse<PaginatedResponse<Shipment>>) {
        // await new Promise(r => setTimeout(r, 4000))

        const shipments = await this.shipmentService.getAll(req)

        res.json(shipments)
    }

    @Route(ShipmentSchema.create, admin)
    async post(req: TypedRequest<typeof ShipmentSchema.create>, res: TypedResponse<Shipment>) {
        const shipment = await this.shipmentService.create(req.validated)

        res.json(shipment.get())
    }
}

export default handle(Handler)