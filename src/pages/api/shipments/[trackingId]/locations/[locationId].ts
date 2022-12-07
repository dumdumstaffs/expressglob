import { Controller, handle, Route } from "@/utils/handler";
import type { TypedRequest, TypedResponse } from "@/types/request";
import { admin } from "@/middlewares/admin";
import ShipmentSchema from "@/schemas/shipment";
import ShipmentService from "@/services/shipment";
import { ShipmentLocationResource } from "@/models/shipment";

@Controller(admin)
class Handler {
    constructor(private readonly shipmentService: ShipmentService) { }

    @Route(ShipmentSchema.updateLocation)
    async put(
        req: TypedRequest<typeof ShipmentSchema.updateLocation, { trackingId: string, locationId: string }>,
        res: TypedResponse<ShipmentLocationResource>
    ) {

        const { trackingId, locationId } = req.query

        const updatedLocation = await this.shipmentService.updateLocation(trackingId, locationId, req.validated)

        res.json(updatedLocation)
    }

    @Route()
    async delete(req: TypedRequest<null, { trackingId: string, locationId: string }>, res: TypedResponse) {

        const { trackingId, locationId } = req.query

        await this.shipmentService.deleteLocation(trackingId, locationId)

        res.json({ message: "Location removed successfully" })
    }
}

export default handle(Handler)