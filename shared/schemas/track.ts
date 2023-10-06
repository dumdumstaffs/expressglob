import { z } from "zod";

export default class TrackSchema {
  public static track = z.object({
    trackingId: z.string(),
  });
}
