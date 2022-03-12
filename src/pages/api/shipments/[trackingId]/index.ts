import { Controller, handle, Route } from "@/utils/handler";
import { admin } from "@/middlewares/admin";
import ShipmentService from "@/services/shipment";
import ShipmentSchema from "@/schemas/shipment";
import { TypedRequest, TypedResponse } from "@/types/request";
import { Shipment } from "@/types/shipment";

@Controller()
class Handler {
    constructor(private readonly shipmentService: ShipmentService) { }

    @Route()
    async get(req: TypedRequest<null, { trackingId: string }>, res: TypedResponse<Shipment>) {
        // await new Promise(r => setTimeout(r, 4000))

        const { trackingId } = req.query

        const shipment = await this.shipmentService.findOrFail(trackingId)

        res.json(shipment.get())
    }

    @Route(ShipmentSchema.update, admin)
    async put(req: TypedRequest<typeof ShipmentSchema.update>, res: TypedResponse<Shipment>) {

        const { trackingId } = req.query

        const updatedShipment = await this.shipmentService.update(trackingId, req.validated)

        res.json(updatedShipment.get())
    }
}

export default handle(Handler)