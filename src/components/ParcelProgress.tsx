import { ShipmentStatus } from "@shared/types/shipment";

const ParcelProgress = ({ progress }: { progress: ShipmentStatus }) => {
  const stages: ShipmentStatus[] = [
    "initiated",
    "inTransit",
    "arrived",
    "outForDelivery",
    "onHold",
    "delivered",
  ];

  const is = (p: ShipmentStatus, exact?: boolean) => {
    if (exact) return p === progress;
    return stages.indexOf(p) <= stages.indexOf(progress);
  };

  const style = (progress: ShipmentStatus) => {
    let className =
      "w-5 h-5 tw-translate-center rounded-full absolute cursor-pointer";
    const append = (c: string, cond: boolean = true, or?: string) =>
      (className += ` ${cond ? c : or || ""}`);

    // progress scoped styles
    if (progress === "initiated") {
      append("-left-1 bg-fedex");
    }
    if (progress === "inTransit") {
      append("left-1/4");
      append("bg-fedex", is("inTransit"), "bg-fedex-bg");
      append("w-7 h-7", is("inTransit", true));
    }
    if (progress === "arrived") {
      append("left-2/4");
      append("bg-fedex", is("arrived"), "bg-fedex-bg");
      append("w-7 h-7", is("arrived", true));
    }
    if (progress === "outForDelivery") {
      append("left-3/4");
      append("bg-fedex", is("outForDelivery"), "bg-fedex-bg");
      append("w-7 h-7", is("outForDelivery", true));
    }
    if (progress === "delivered") {
      append("-right-1");
      append("w-7 h-7 bg-fedex", is("delivered"), "bg-fedex-bg");
    }

    // general styles
    if (is("onHold")) {
      append("bg-yellow-500", progress !== "delivered");
    }
    append("bg-green-500", is("delivered"));

    return className;
  };

  return (
    <div className="relative h-7 my-12 mx-4 sm:mx-0">
      <div className="w-full h-1 bg-fedex-bg mx-auto rounded-full absolute top-1/2" />

      <div
        className={`
                h-1 mx-auto rounded-full absolute top-1/2 bg-fedex
                ${progress === "initiated" ? "w-[calc(10%+4px)]" : ""}
                ${progress === "inTransit" ? "w-[calc(25%+4px)]" : ""}
                ${progress === "arrived" ? "w-[calc(50%+4px)]" : ""}
                ${progress === "outForDelivery" ? "w-[calc(75%+4px)]" : ""}
                ${
                  progress === "onHold" ? "w-[calc(75%+4px)] bg-yellow-500" : ""
                }
                ${progress === "delivered" ? "w-full bg-green-500" : ""}
                `}
      />

      <div className={style("initiated")} />
      <div className={style("inTransit")} />
      <div className={style("arrived")} />
      <div className={style("outForDelivery")} />
      <div className={style("onHold")} />
      <div className={style("delivered")} />

      <div
        className={`
                w-5 h-5 rounded-full text-white font-bold absolute top-1/2 cursor-pointer tw-translate-center
                ${is("initiated", true) ? "-right-0" : ""}
                ${is("inTransit", true) ? "left-[calc(25%+3px)]" : ""}
                ${is("arrived", true) ? "left-[calc(50%+3px)]" : ""}
                ${is("outForDelivery", true) ? "left-[calc(75%+3px)]" : ""}
                ${is("onHold", true) ? "left-[calc(75%+3px)]" : ""}
                ${is("delivered", true) ? "-right-0" : ""}
                `}
        dangerouslySetInnerHTML={
          is("delivered")
            ? { __html: "&#10003;" }
            : is("onHold")
            ? undefined
            : { __html: "&#8594;" }
        }
      />
    </div>
  );
};

export default ParcelProgress;
