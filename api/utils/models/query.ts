import { z } from "zod";

export const paginationQuery = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  paginate: z.string().optional(),
});
export type PaginationQueryParams = z.infer<typeof paginationQuery>;

export const filterQuery = z.record(z.string(), z.string());
export type FilterQueryParams = z.infer<typeof filterQuery>;
