import { useCallback, useMemo, useState } from "react"
import { useQuery, UseQueryOptions } from "react-query"
import { PaginatedResponse } from "@/types"

export type PaginatedQueryKey = [string, ...readonly unknown[]]

export const usePaginatedQuery = <T>(
    queryKey: PaginatedQueryKey,
    queryFn: (page: number) => Promise<PaginatedResponse<T>>,
    options?: Omit<UseQueryOptions<PaginatedResponse<T>>, "queryKey" | "keepPreviousData">
) => {
    const [page, setPage] = useState(1)

    const query = useQuery([...queryKey, { page }], () => queryFn(page), { ...options, keepPreviousData: true })

    const hasMore = useMemo(() => Boolean(!query.isPreviousData && query.data?.cursor.next), [query])

    const prev = useCallback(() => setPage(p => Math.max(p - 1, 1)), [])

    const next = useCallback(() => {
        if (hasMore) setPage(p => p + 1)
    }, [query, hasMore])

    return {
        page, prev, next, hasMore, query
    }
}