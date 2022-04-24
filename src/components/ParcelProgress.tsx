import { ShipmentStatus } from "@/types/shipment"

const ParcelProgress = ({ progress }: { progress: ShipmentStatus }) => {
    const stages: ShipmentStatus[] = ["initiated", "inTransit", "awaitingPayment", "delivered"]

    const is = (p: ShipmentStatus, exact?: boolean) => {
        if (exact) return p === progress
        return stages.indexOf(p) <= stages.indexOf(progress)
    }

    const style = (progress: ShipmentStatus) => {
        let className = "w-5 h-5 tw-translate-center rounded-full absolute cursor-pointer"
        const append = (c: string, cond: boolean = true, or?: string) => className += ` ${cond ? c : or || ""}`

        // progress scoped styles
        if (progress === "initiated") {
            append("-left-1 bg-fedex")
        }
        if (progress === "inTransit") {
            append("left-1/3")
            append("bg-fedex", is("inTransit"), "bg-fedex-bg")
            append("w-7 h-7", is("inTransit", true))
        }
        if (progress === "awaitingPayment") {
            append("left-2/3")
            append("bg-fedex", is("awaitingPayment"), "bg-fedex-bg")
            append("w-7 h-7", is("awaitingPayment", true))
        }
        if (progress === "delivered") {
            append("-right-1")
            append("w-7 h-7 bg-fedex", is("delivered"), "bg-fedex-bg")
        }

        // general styles
        append("bg-green-500", is("delivered"))

        return className
    }

    return (
        <div className="relative h-7 my-12 mx-4 sm:mx-0">
            <div className="w-full h-1 bg-fedex-bg mx-auto rounded-full absolute top-1/2" />

            <div className={`
                h-1 mx-auto rounded-full absolute top-1/2 bg-fedex
                ${progress === "initiated" ? "w-[calc(10.33%+4px)]" : ""}
                ${progress === "inTransit" ? "w-[calc(33.33%+4px)]" : ""}
                ${progress === "awaitingPayment" ? "w-[calc(66.66%+4px)]" : ""}
                ${progress === "delivered" ? "w-full bg-green-500" : ""}
                `
            } />

            <div className={style("initiated")} />
            <div className={style("inTransit")} />
            <div className={style("awaitingPayment")} />
            <div className={style("delivered")} />

            <div className={`
                w-5 h-5 rounded-full text-white font-bold absolute top-[calc(50%+1.5px)] cursor-pointer tw-translate-center
                ${is("initiated", true) ? "-right-0" : ""}
                ${is("inTransit", true) ? "left-[calc(33.33%+3px)]" : ""}
                ${is("awaitingPayment", true) ? "left-[calc(66.66%+3px)]" : ""}
                ${is("delivered", true) ? "-right-0" : ""}
                `
            }
                dangerouslySetInnerHTML={is("delivered") ? { __html: "&#10003;" } : { __html: "&#8594;" }}
            />
        </div>
    )
}

export default ParcelProgress