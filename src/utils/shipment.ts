import { format } from "date-fns"
import { Shipment, ShipmentHistory } from "@/types/shipment";

export const shippingStatuses: Record<Shipment["status"], string> = {
    initiated: "Initiated",
    pickedUp: "Picked Up",
    inTransit: "In Transit",
    delivered: "Delivered"
}

export const parseStatus = (status: Shipment["status"]) => {
    return shippingStatuses[status]
}


export const parseHistory = (locations: Shipment["locations"]): ShipmentHistory => {
    const history = locations.map(l => {
        const fullDate = new Date(l.date)

        const date = format(fullDate, "d/MM/yyyy")
        const time = format(fullDate, "hh:mm a")
        const day = format(fullDate, "EEEE")

        return { ...l, date, time, day }

    }).reduce<{ [k: string]: ShipmentHistory[string] }>((acc, curr) => {
        const { day, date, ...rest } = curr
        const key = day + " " + date

        if (!acc[key]) acc[key] = []
        acc[key].push(rest)

        return acc
    }, {})

    return history
}

export const shippingServices = [
    {
        name: "fedex-ground",
        desc: "OptionDelivery Ground®",
        routines: "Delivers by end of day (business addresses only)"
    },
    {
        name: "fedex-home-delivery",
        desc: "OptionDelivery Home Delivery®",
        routines: "Delivery between 9 a.m. and 8 p.m., Mon.-Sat. in 1-5 business days (residential addresses only)"
    },
    {
        name: "fedex-same-day",
        desc: "OptionDelivery SameDay®",
        routines: "Door-to-door delivery in just hours"
    },
    {
        name: "fedex-intl-next-flight",
        desc: "OptionDelivery® International Next Flight",
        routines: "Delivery in just hours, depending on flight availability"
    },
    {
        name: "fedex-intl-first",
        desc: "OptionDelivery International First®",
        routines: "Delivers by end of day (business addresses only)"
    },
    {
        name: "fedex-intl-priority",
        desc: "OptionDelivery International Priority",
        routines: "Delivery typically in 1, 2 or 3 business days to more than 220 countries and territories"
    },
    {
        name: "fedex-intl-ground",
        desc: "OptionDelivery International Ground®",
        routines: "Delivery by end of business day typically in 2-7 business days  (delivery to Canada only)"
    },
    {
        name: "fedex-first-overnight",
        desc: "OptionDelivery First Overnight®",
        routines: "Delivery first thing the next business-day morning by 8, 8:30, 9 or 9: 30 a.m.to most areas and by 10 a.m., 11 a.m.or 2 p.m.to extended areas"
    },
    {
        name: "fedex-priority-overnight",
        desc: "OptionDelivery Priority Overnight®",
        routines: "Next-business-day delivery by 10: 30 a.m.to most areas and by noon, 4: 30 p.m.or 5 p.m.to some rural areas"
    },
    {
        name: "fedex-standard-overnight",
        desc: "OptionDelivery Standard Overnight®",
        routines: "Delivery the next business day in the afternoon by 3 p.m.to most areas and by 4: 30 p.m. to some rural areas(by 8 p.m. to residences)"
    }
]

export const parseService = (name: string) => {
    return shippingServices.find((sp) => sp.name === name)
}