type Props = {
  page: number;
  total: number;
  limit: number;
  hasMore: boolean;
  next: () => void;
  prev: () => void;
};

const PaginatedLinks = ({ page, total, limit, hasMore, next, prev }: Props) => (
  <div className="mt-8">
    <p className="text-xs p-1 font-semibold text-gray-400">
      Page {page} of {Math.ceil(total / limit)}
    </p>
    <div className="flex justify-start items-center space-x-4">
      <button
        disabled={page <= 1}
        onClick={prev}
        className={`
                font-semibold text-sm px-4 py-2 rounded-md
                border border-gray-200 border-solid
                text-white bg-fedex/90
                disabled:text-gray-400 disabled:bg-transparent
            `}
      >
        Prev
      </button>
      <button
        disabled={!hasMore}
        onClick={next}
        className={`
                font-semibold text-sm px-4 py-2 rounded-md
                border border-gray-200 border-solid
                text-white bg-fedex/90
                disabled:text-gray-400 disabled:bg-transparent
            `}
      >
        Next
      </button>
    </div>
  </div>
);

export default PaginatedLinks;
