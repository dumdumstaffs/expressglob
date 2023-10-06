import { Shipment } from "@shared/types/shipment";
import { parseHistory } from "@web/utils/shipment";

const ParcelHistory = ({
  shipment,
  onLocation,
}: {
  shipment: Shipment;
  onLocation?: (loactionId: string) => void;
}) => {
  const history = parseHistory(shipment.locations);

  return (
    <div className="my-12">
      {Object.entries(history).map(([date, locations]) => (
        <div className="mb-4" key={date}>
          <div className="flex justify-between items-center bg-fedex-bg text-gray-700">
            <p className="text-xs font-bold m-0 p-2">{date}</p>
            <p className="text-xs font-bold m-0 p-2"></p>
            <p className="text-xs font-bold m-0 p-2"></p>
            <p className="text-xs font-bold m-0 p-2"></p>
          </div>
          {locations.map((location, i) => (
            <div
              key={i}
              className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center px-2 sm:px-0 text-gray-600 text-left"
            >
              <p className="absolute top-1 right-2 sm:static tracking-wide text-xs font-bold m-0 py-1 sm:py-3 sm:w-1/5">
                {onLocation && (
                  <span
                    className="text-xs px-4 py-1 bg-gray-100 font-semibold rounded cursor-pointer"
                    onClick={() => onLocation(location.id)}
                  >
                    Update
                  </span>
                )}
              </p>
              <p className="tracking-wide text-xs font-bold m-0 py-1 sm:py-3 sm:w-1/5">
                {location.time}
              </p>
              <p className="tracking-wide text-xs font-bold m-0 py-1 sm:py-3 sm:w-1/5 uppercase">
                {location.address}
              </p>
              <p className="tracking-wide text-xs font-bold m-0 py-1 sm:py-3 sm:w-2/5">
                {location.comment}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ParcelHistory;
