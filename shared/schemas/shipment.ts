import { z } from "zod";

export default class ShipmentSchema {
  public static create = z.object({
    desc: z.string(),

    shipperName: z.string(),
    shipperStreetAddress: z.string(),
    shipperAddress: z.string(),
    shipperPhone: z.string(),
    shipperEmail: z.string().email().optional(),
    shipperCompany: z.string().optional(),

    receiverName: z.string(),
    receiverStreetAddress: z.string(),
    receiverAddress: z.string(),
    receiverPhone: z.string(),
    receiverEmail: z.string().email().optional(),
    receiverCompany: z.string().optional(),

    shipDate: z.string().pipe(z.coerce.date()),
    scheduledDate: z.string().pipe(z.coerce.date()),

    weight: z.string(),
    dimensions: z.string(),
    service: z.string(),
    signature: z.boolean(),
  });

  public static update = ShipmentSchema.create.extend({
    status: z.enum(["initiated", "inTransit", "awaitingPayment", "delivered"]),
    arrivalDate: z.string().pipe(z.coerce.date()).optional(),
  });

  public static pushLocation = z.object({
    date: z.string().pipe(z.coerce.date()),
    address: z.string(),
    comment: z.string(),
  });

  public static updateLocation = ShipmentSchema.pushLocation.extend({});

  public static pushImage = z.object({
    cloudId: z.string(),
    url: z.string(),
  });
}
