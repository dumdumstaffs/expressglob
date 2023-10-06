import { Shipment, ShipmentHistory } from "@shared/types/shipment";
import { format } from "date-fns";

export const parseHistory = (
  locations: Shipment["locations"],
): ShipmentHistory => {
  const history = locations
    .map((l) => {
      const fullDate = new Date(l.date);

      const date = format(fullDate, "d/MM/yyyy");
      const time = format(fullDate, "hh:mm a");
      const day = format(fullDate, "EEEE");

      return { ...l, date, time, day };
    })
    .reduce<{ [k: string]: ShipmentHistory[string] }>((acc, curr) => {
      const { day, date, ...rest } = curr;
      const key = day + " " + date;

      if (!acc[key]) acc[key] = [];
      acc[key].push(rest);

      return acc;
    }, {});

  return history;
};

export const shippingStatuses: Record<Shipment["status"], string> = {
  initiated: "Initiated",
  inTransit: "In Transit",
  awaitingPayment: "Awaiting Payment",
  delivered: "Delivered",
};

export const parseStatus = (status: Shipment["status"]) => {
  return shippingStatuses[status];
};

export const shippingServices = [
  {
    name: "ground",
    desc: "ExpressGlob Ground®",
    routines: "Delivers by end of day (business addresses only)",
  },
  {
    name: "home-delivery",
    desc: "ExpressGlob Home Delivery®",
    routines:
      "Delivery between 9 a.m. and 8 p.m., Mon.-Sat. in 1-5 business days (residential addresses only)",
  },
  {
    name: "same-day",
    desc: "ExpressGlob SameDay®",
    routines: "Door-to-door delivery in just hours",
  },
  {
    name: "intl-next-flight",
    desc: "ExpressGlob® International Next Flight",
    routines: "Delivery in just hours, depending on flight availability",
  },
  {
    name: "intl-first",
    desc: "ExpressGlob International First®",
    routines: "Delivers by end of day (business addresses only)",
  },
  {
    name: "intl-priority",
    desc: "ExpressGlob International Priority",
    routines:
      "Delivery typically in 1, 2 or 3 business days to more than 220 countries and territories",
  },
  {
    name: "intl-ground",
    desc: "ExpressGlob International Ground®",
    routines:
      "Delivery by end of business day typically in 2-7 business days  (delivery to Canada only)",
  },
  {
    name: "first-overnight",
    desc: "ExpressGlob First Overnight®",
    routines:
      "Delivery first thing the next business-day morning by 8, 8:30, 9 or 9: 30 a.m.to most areas and by 10 a.m., 11 a.m.or 2 p.m.to extended areas",
  },
  {
    name: "priority-overnight",
    desc: "ExpressGlob Priority Overnight®",
    routines:
      "Next-business-day delivery by 10: 30 a.m.to most areas and by noon, 4: 30 p.m.or 5 p.m.to some rural areas",
  },
  {
    name: "standard-overnight",
    desc: "ExpressGlob Standard Overnight®",
    routines:
      "Delivery the next business day in the afternoon by 3 p.m.to most areas and by 4: 30 p.m. to some rural areas(by 8 p.m. to residences)",
  },
];

export const parseService = (name: string) => {
  return shippingServices.find((sp) => sp.name === name);
};
