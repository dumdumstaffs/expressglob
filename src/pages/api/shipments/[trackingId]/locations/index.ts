import { Controller, handle, Route } from "@/utils/handler";
import { TypedRequest, TypedResponse } from "@/types/request";
import { admin } from "@/middlewares/admin";
import ShipmentService from "@/services/shipment";
import ShipmentSchema from "@/schemas/shipment";
import { ShipmentLocationResource } from "@/models/shipment";

@Controller(admin)
class Handler {
    constructor(private readonly shipmentService: ShipmentService) { }

    @Route(ShipmentSchema.pushLocation)
    async post(req: TypedRequest<typeof ShipmentSchema.pushLocation, { trackingId: string }>, res: TypedResponse<ShipmentLocationResource>) {

        const { trackingId } = req.query

        const location = await this.shipmentService.pushLocation(trackingId, req.validated)

        res.json(location)
    }
}

export default handle(Handler)