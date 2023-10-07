import { Shipment } from "@shared/types/shipment";
import { trpc } from "@web/api/trpc";
import { Loader, LoaderError } from "@web/components/Loader";
import PaginatedLinks from "@web/components/PaginationLinks";
import { usePagination } from "@web/hooks/usePagination";
import { parseStatus } from "@web/utils/shipment";
import Link from "next/link";

export const ParcelList = () => {
  const pagination = usePagination();
  const shipments = trpc.shipment.getAll.useQuery(
    {
      page: pagination.page,
    },
    pagination.options,
  );

  return (
    <div className="my-12 px-2 sm:px-0">
      <div className="hidden sm:!flex justify-between rounded-lg items-center px-2 mb-4 bg-fedex-bg text-gray-700">
        <p className="text-xs font-bold m-0 py-2 sm:w-1/5">Tracking ID</p>
        <p className="text-xs font-bold m-0 py-2 sm:w-1/5">Receiver</p>
        <p className="text-xs font-bold m-0 py-2 sm:w-1/5">Destination</p>
        <p className="text-xs font-bold m-0 py-2 sm:w-1/5">Status</p>
        <p className="text-xs font-bold m-0 py-2 sm:w-1/5">Activity History</p>
      </div>
      <div className="space-y-4">
        {shipments.isLoading ? (
          <Loader size="small" />
        ) : shipments.isError ? (
          <LoaderError size="small" message="Unable to load admins" />
        ) : (
          shipments.isSuccess && (
            <>
              {shipments.data.data.map((shipment) => (
                <div
                  key={shipment.id}
                  className={
                    shipments.isPreviousData
                      ? "opacity-40 pointer-events-none"
                      : undefined
                  }
                >
                  <ShipmentItem shipment={shipment} />
                </div>
              ))}
              <PaginatedLinks
                page={shipments.data.page}
                total={shipments.data.total}
                limit={shipments.data.limit}
                hasMore={pagination.hasMore(
                  shipments.data,
                  shipments.isPreviousData,
                )}
                next={pagination.next}
                prev={pagination.prev}
              />
            </>
          )
        )}
      </div>
    </div>
  );
};

const ShipmentItem = ({ shipment }: { shipment: Shipment }) => (
  <Link
    href={{
      pathname: "/manager/track",
      query: { trackingId: shipment.trackingId },
    }}
    className={`
            flex flex-col sm:flex-row justify-between items-start text-left sm:items-center
            p-2 rounded-lg cursor-pointer
            text-gray-600 bg-fedex-light border-solid border-2 border-fedex-light hover:border-fedex-bg
        `}
  >
    <p className="tracking-wide text-sm text-gray-700 font-bold m-0 py-1 sm:py-3 sm:w-1/5">
      {shipment.trackingId}
    </p>
    <p className="m-0 py-1 sm:py-3 w-full sm:w-1/5 flex items-center justify-between sm:block">
      <span className="sm:hidden text-xs font-bold">Receiver:</span>
      <span className="tracking-wide text-xs font-bold">
        {shipment.receiver.name}
      </span>
    </p>
    <p className="m-0 py-1 sm:py-3 w-full sm:w-1/5 flex items-center justify-between sm:block">
      <span className="sm:hidden text-xs font-bold">Destination:</span>
      <span className="tracking-wide text-xs font-bold uppercase">
        {shipment.receiver.address}
      </span>
    </p>
    <p className="m-0 py-1 sm:py-3 w-full sm:w-1/5 flex items-center justify-between sm:block">
      <span className="sm:hidden text-xs font-bold">Status:</span>
      <span className="tracking-wide text-xs font-bold">
        {parseStatus(shipment.status)}
      </span>
    </p>
    <p className="m-0 py-1 sm:py-3 w-full sm:w-1/5 flex items-center justify-between sm:block">
      <span className="sm:hidden text-xs font-bold">Activity History:</span>
      <span className="tracking-wide text-xs font-bold">
        {shipment.locations[0]?.comment ||
          "Shipment information sent to ExpressGlob"}
      </span>
    </p>
  </Link>
);
