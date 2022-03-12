import { Controller, handle, Route } from "@/utils/handler";
import { admin } from "@/middlewares/admin";
import ShipmentService from "@/services/shipment";
import ShipmentSchema from "@/schemas/shipment";
import { TypedRequest, TypedResponse } from "@/types/request";
import { Location } from "@/types/shipment";

@Controller(admin)
class Handler {
    constructor(private readonly shipmentService: ShipmentService) { }

    @Route(ShipmentSchema.pushLocation)
    async post(req: TypedRequest<typeof ShipmentSchema.pushLocation, { trackingId: string }>, res: TypedResponse<Location>) {

        const { trackingId } = req.query

        const location = await this.shipmentService.pushLocation(trackingId, req.validated)

        res.json(location.get())
    }
}

export default handle(Handler)