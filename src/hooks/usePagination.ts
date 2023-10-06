import { PaginatedResponse } from "@shared/types/pagination";
import { useCallback, useMemo, useState } from "react";

export const usePagination = (limit?: number | undefined) => {
  const [page, setPage] = useState(1);

  const pageInfo = useMemo(
    () => ({
      page: page,
      limit,
    }),
    [page, limit],
  );

  const options = useMemo(() => ({ keepPreviousData: true }), []);

  const prev = useCallback(() => setPage((p) => Math.max(p - 1, 1)), []);

  const next = useCallback(() => setPage((p) => p + 1), []);

  const hasMore = useCallback(
    (data: PaginatedResponse<unknown>, isPreviousData: boolean) =>
      Boolean(!isPreviousData && data?.cursor.next),
    [],
  );

  return {
    page: pageInfo,
    options,
    prev,
    next,
    hasMore,
  };
};
