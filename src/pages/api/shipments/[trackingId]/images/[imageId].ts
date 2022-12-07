import { Controller, handle, Route } from "@/utils/handler";
import type { TypedRequest, TypedResponse } from "@/types/request";
import { admin } from "@/middlewares/admin";
import ShipmentService from "@/services/shipment";

@Controller(admin)
class Handler {
    constructor(private readonly shipmentService: ShipmentService) { }

    @Route()
    async delete(req: TypedRequest<null, { trackingId: string, imageId: string }>, res: TypedResponse) {

        const { trackingId, imageId } = req.query

        await this.shipmentService.deleteImage(trackingId, imageId)

        res.json({ message: "Image removed successfully" })
    }
}

export default handle(Handler)