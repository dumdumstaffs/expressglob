import { adminProcedure, publicProcedure, router } from "@api/server/trpc";
import { paginationQuery } from "@api/utils/models/query";
import ShipmentSchema from "@shared/schemas/shipment";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const shipmentRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        page: paginationQuery,
      }),
    )
    .query(async ({ ctx, input }) => {
      const shipments = await ctx.container.shipment.getAll(input.page);

      return shipments.toJSON();
    }),

  getOne: publicProcedure
    .input(
      z.object({
        trackingId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const shipment = await ctx.container.shipment.findByTrackingid(
        input.trackingId,
      );
      if (!shipment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Shipment not found",
        });
      }

      return shipment.toJSON();
    }),

  create: adminProcedure
    .input(ShipmentSchema.create)
    .mutation(async ({ ctx, input }) => {
      const shipment = await ctx.container.shipment.create(input);

      return shipment.toJSON();
    }),

  update: adminProcedure
    .input(
      z.object({
        trackingId: z.string(),
        shipmentData: ShipmentSchema.update,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const shipment = await ctx.container.shipment.update(
        input.trackingId,
        input.shipmentData,
      );
      if (!shipment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Shipment not found",
        });
      }

      return shipment.toJSON();
    }),

  addLocation: adminProcedure
    .input(
      z.object({
        trackingId: z.string(),
        locationData: ShipmentSchema.pushLocation,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const location = await ctx.container.shipment.pushLocation(
        input.trackingId,
        input.locationData,
      );
      if (!location) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Shipment not found",
        });
      }

      return location.toJSON();
    }),

  updateLocation: adminProcedure
    .input(
      z.object({
        trackingId: z.string(),
        locationId: z.string(),
        locationData: ShipmentSchema.updateLocation,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const location = await ctx.container.shipment.updateLocation(
        input.trackingId,
        input.locationId,
        input.locationData,
      );
      if (!location) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Shipment location not found",
        });
      }

      return location.toJSON();
    }),

  removeLocation: adminProcedure
    .input(
      z.object({
        trackingId: z.string(),
        locationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const location = await ctx.container.shipment.deleteLocation(
        input.trackingId,
        input.locationId,
      );
      if (!location) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Shipment location not found",
        });
      }

      return { message: "Shipment location removed successfully" };
    }),

  addImage: adminProcedure
    .input(
      z.object({
        trackingId: z.string(),
        imageData: ShipmentSchema.pushImage,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const image = await ctx.container.shipment.pushImage(
        input.trackingId,
        input.imageData,
      );
      if (!image) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Shipment image not found",
        });
      }

      return image.toJSON();
    }),

  removeImage: adminProcedure
    .input(
      z.object({
        trackingId: z.string(),
        imageId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const image = await ctx.container.shipment.deleteImage(
        input.trackingId,
        input.imageId,
      );
      if (!image) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Shipment image not found",
        });
      }

      return { message: "Shipment image removed successfully" };
    }),
});
