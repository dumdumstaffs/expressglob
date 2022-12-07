import { Controller, handle, Route } from "@/utils/handler";
import type { TypedRequest, TypedResponse } from "@/types/request";
import { admin } from "@/middlewares/admin";
import ShipmentService from "@/services/shipment";
import ShipmentSchema from "@/schemas/shipment";
import { ShipmentImageResource } from "@/models/shipment";

@Controller(admin)
class Handler {
    constructor(private readonly shipmentService: ShipmentService) { }

    @Route(ShipmentSchema.pushImage)
    async post(req: TypedRequest<typeof ShipmentSchema.pushImage, { trackingId: string }>, res: TypedResponse<ShipmentImageResource>) {

        const { trackingId } = req.query

        const location = await this.shipmentService.pushImage(trackingId, req.validated)

        res.json(location)
    }
}

export default handle(Handler)