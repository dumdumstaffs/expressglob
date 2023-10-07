import { Shipment } from "@shared/types/shipment";
import { parseStatus } from "@web/utils/shipment";
import { format } from "date-fns";
import { useState } from "react";
import ParcelImages from "./ParcelImages";
import ParcelProgress from "./ParcelProgress";

const ParcelBody = ({ shipment }: { shipment: Shipment }) => {
  const [statusUpdates, setStatusUpdates] = useState(true);

  return (
    <div className="text-center mt-12 mx-auto w-full sm:w-8/12">
      <div className="px-2">
        {shipment.arrivalDate ? (
          <div>
            <h3 className="text-2xl sm:text-4xl m-0 mb-2 font-light">
              Delivered
            </h3>
            <h2 className="text-2xl sm:text-4xl m-0 font-light">
              {format(new Date(shipment.arrivalDate), "EEEE dd/MM/yyyy")} at{" "}
              {format(new Date(shipment.arrivalDate), "hh:mm a")}
            </h2>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl sm:text-4xl m-0 mb-2 font-light">
              Scheduled delivery:
            </h3>
            <h2 className="text-2xl sm:text-4xl m-0 font-light">
              {format(new Date(shipment.scheduledDate), "EEEE dd/MM/yyyy")} by
              end of day
            </h2>
          </div>
        )}

        <ParcelProgress progress={shipment.status} />
      </div>

      <h2 className="uppercase text-sm font-bold">
        {parseStatus(shipment.status)}
      </h2>
      <p className="text-xl font-light">
        {shipment.locations[0]
          ? shipment.locations[0].comment
          : "On ExpressGlob vehicle for delivery"}
      </p>
      <p className="uppercase font-light text-lg">
        {shipment.receiver.address}
      </p>
      <a
        onClick={() => setStatusUpdates((s) => !s)}
        className="block mb-10 uppercase text-sm font-bold tracking-widest mt-4 cursor-pointer"
        aria-label="Get Status Updates"
      >
        Get Status Updates
      </a>

      <div
        onClick={() => setStatusUpdates(false)}
        className={`bg-fedex-bg text-gray-800 text-sm pl-14 pr-4 py-4 text-left relative cursor-pointer ${
          !statusUpdates ? "hidden" : ""
        }`}
      >
        <p className="absolute top-4 left-6 border-solid border rounded-full w-5 h-5 text-sm font-bold text-center">
          i
        </p>
        Live notifications is already setup for this package, you will be
        notified when this package arrives its destination. For further
        assistance, please contact
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 items-center justify-between text-center mt-12">
        <div className="flex flex-col items-center justify-between">
          <p className="text-sm font-bold uppercase">From</p>
          <p className="uppercase font-thin">{shipment.shipper.address}</p>
        </div>
        <div className="flex flex-col items-center justify-between">
          <p className="text-sm font-bold uppercase">To</p>
          <p className="uppercase font-thin">{shipment.receiver.address}</p>
        </div>
      </div>

      <h2 className="text-2xl sm:text-4xl m-0 my-7 font-light">
        {shipment.desc}
      </h2>

      <ParcelImages images={shipment.images} />
    </div>
  );
};

export default ParcelBody;
