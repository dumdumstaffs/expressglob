import { Controller, handle, Route } from "@/utils/handler";
import { TypedRequest, TypedResponse } from "@/types/request";
import ShipmentService from "@/services/shipment";
import captureWebsite from "capture-website";
import { config } from "@/utils/config";

@Controller()
class Handler {
    constructor(private readonly shipmentService: ShipmentService) { }

    @Route()
    async get(req: TypedRequest<null, { trackingId: string }>, res: TypedResponse<any>) {

        const { trackingId } = req.query

        const protocol = config.app.isDev ? "http://" : "https://"
        const url = protocol + req.headers.host + "/" + "/invoice/" + trackingId

        const buffer = await captureWebsite.buffer(url, {
            width: 414,
            height: 600,
            hideElements: [".download"]
        })

        res.writeHead(200, {
            "Content-type": "image/png",
            "Content-length": buffer.length,
            "Content-disposition": "attachment; filename=" + "Invoice - " + trackingId
        })
        res.end(buffer)
    }
}

export default handle(Handler)