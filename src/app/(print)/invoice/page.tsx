"use client";

import { trpc } from "@web/api/trpc";
import { Loader, LoaderError } from "@web/components/Loader";
import Logo from "@web/components/Logo";
import useWindowDimensions from "@web/hooks/useWindowDimensions";
import { clientConfig } from "@web/utils/config";
import { parseService, parseStatus } from "@web/utils/shipment";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { HTMLAttributes } from "react";

export default function Invoice() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const searchParams = useSearchParams();
  const trackingId = searchParams?.get("trackingId");

  const shipment = trpc.shipment.getOne.useQuery(
    {
      trackingId: trackingId!,
    },
    {
      enabled: !!trackingId,
    },
  );

  const width = Math.min(windowWidth, 414);
  const height = Math.min(windowHeight, width * 1.45);

  const downloadUrl = new URL(
    `/api/invoice/${trackingId}`,
    clientConfig.api.base,
  ).toString();

  if (shipment.isLoading) return <Loader />;
  if (shipment.isError) return <LoaderError message="Package not found" />;

  if (shipment.isSuccess)
    return (
      <div className="min-h-screen">
        <div
          className="mx-auto py-1 px-2 bg-white overflow-scroll flex flex-col"
          style={{ width, height }}
        >
          <div className="m-0 flex items-center justify-between">
            <Logo invert />
            <a
              download
              href={downloadUrl}
              className="download bg-orange-500 px-3 py-2 text-3xs text-white font-bold"
            >
              Download
            </a>
          </div>

          <div className="text-2xs m-0 p-0 mb-1">Commercial Invoice</div>

          <div className="flex-grow">
            <div className="border-2 border-b-[1px] border-solid h-[35%]">
              <div className="flex h-full">
                <Box className="w-[28%] flex-grow h-full border-r-2">
                  <Box center className="h-[15%] border-b-2">
                    <Text caps bold>
                      Track: {shipment.data.trackingId}
                    </Text>
                  </Box>
                  <Box className="h-[40%] border-b-2 bg-gray-800"></Box>
                  <Box center className="h-[15%] border-b-2">
                    <Text caps bold>
                      Receiver Name:
                    </Text>
                  </Box>
                  <Box center className="h-[15%] border-b-2">
                    <Text caps bold>
                      Receiver Address:
                    </Text>
                  </Box>
                  <Box center className="h-[15%]">
                    <Text caps bold>
                      Receiver Email:
                    </Text>
                  </Box>
                </Box>
                <Box className="w-[72%] h-full">
                  <Box center className="h-[15%] border-b-2">
                    <Text>
                      <span className="uppercase font-bold">
                        Courier Package:{" "}
                      </span>
                      <span className="font-extrabold">Parcel</span>
                    </Text>
                  </Box>
                  <Box center className="h-[40%] border-b-2 bg-blue-800">
                    <Text className="text-gray-200 tracking-wide leading-3">
                      Our shipping company ensures that the commodities are
                      transported from one distant place to the other through
                      different transporting mediums. Our shipping company
                      ensures that the professional commodities are transported
                      to different locations in secure mode.
                    </Text>
                  </Box>
                  <Box className="h-[45%] p-2 flex flex-col items-start justify-between">
                    <Text>{shipment.data.receiver.name}</Text>
                    <Text>
                      {shipment.data.receiver.streetAddress},{" "}
                      {shipment.data.receiver.address}
                    </Text>
                    <Text>{shipment.data.receiver.email}</Text>
                  </Box>
                </Box>
              </div>
            </div>
            <div className="border-2 border-b-[1px] border-solid h-[40%]">
              <div className="flex h-full">
                <Box className="w-2/6 h-full border-r-2">
                  <Box center className="h-[13.33%] border-b-2">
                    <Text caps bold>
                      Sender Name:
                    </Text>
                  </Box>
                  <Box center className="h-[20%] border-b-2">
                    <Text>{shipment.data.shipper.name}</Text>
                  </Box>
                  <Box center className="h-[13.33%] border-b-2">
                    <Text caps bold>
                      Quantity
                    </Text>
                  </Box>
                  <Box center className="h-[17%] border-b-2"></Box>
                  <Box center className="h-[13.33%] border-b-2 bg-red-700">
                    <Text caps bold className="text-gray-200">
                      Ship Date:{" "}
                      {format(new Date(shipment.data.shipDate), "yyyy-MM-dd")}
                    </Text>
                  </Box>
                  <Box center className="h-[23%]">
                    <Text>{parseService(shipment.data.service)?.routines}</Text>
                  </Box>
                </Box>
                <Box className="w-2/6 h-full border-r-2">
                  <Box center className="h-[13.33%] border-b-2">
                    <Text caps bold>
                      Sender Address:
                    </Text>
                  </Box>
                  <Box center className="h-[20%] border-b-2">
                    <Text>
                      {shipment.data.shipper.streetAddress},{" "}
                      {shipment.data.shipper.address}
                    </Text>
                  </Box>
                  <Box center className="h-[13.33%] border-b-2">
                    <Text caps bold>
                      Expected Delivery Date:
                    </Text>
                  </Box>
                  <Box center className="h-[17%] border-b-2">
                    <Text>
                      {format(
                        new Date(shipment.data.scheduledDate),
                        "yyyy-MM-dd",
                      )}
                    </Text>
                  </Box>
                  <Box center className="h-[13.33%] border-b-2 bg-red-700">
                    <Text caps bold className="text-gray-200">
                      Tracking ID: {shipment.data.trackingId}
                    </Text>
                  </Box>
                  <Box center className="h-[23%]">
                    <Text>{clientConfig.app.address}</Text>
                  </Box>
                </Box>
                <Box className="w-2/6 h-full">
                  <Box center className="h-[13.33%] border-b-2">
                    <Text caps bold>
                      Shipment Status:
                    </Text>
                  </Box>
                  <Box center className="h-[20%] border-b-2">
                    <Text>{parseStatus(shipment.data.status)}</Text>
                  </Box>
                  <Box center className="h-[13.33%] border-b-2">
                    <Text caps bold>
                      Service Type:
                    </Text>
                  </Box>
                  <Box center className="h-[17%] border-b-2">
                    <Text>{parseService(shipment.data.service)?.desc}</Text>
                  </Box>
                  <Box
                    center
                    className="h-[13.33%] border-b-2 bg-gray-800"
                  ></Box>
                  <Box center className="h-[23%]">
                    <Text>{clientConfig.app.emailAlias}</Text>
                  </Box>
                </Box>
              </div>
            </div>
            <div className="border-1 border-solid h-[25%]">
              <div className="flex h-full">
                <Box className="w-[20%] h-full border-r-2">
                  <Box center className="h-[40%] border-b-2">
                    <Text caps bold>
                      Description:
                    </Text>
                  </Box>
                  <Box center className="h-[20%] border-b-2">
                    <Text caps bold>
                      Weight:
                    </Text>
                  </Box>
                  <Box center className="h-[20%] border-b-2">
                    <Text caps bold>
                      Remark:
                    </Text>
                  </Box>
                  <Box center className="h-[20%]">
                    <Text caps bold>
                      Location:
                    </Text>
                  </Box>
                </Box>
                <Box className="flex-grow h-full">
                  <Box center className="h-[40%] border-b-2 bg-red-700">
                    <Text className="text-gray-200">
                      <b>RULES AND REGULATIONS</b> <br />
                      <i>
                        We must obey International convention for the Safety of
                        Life at Sea. Obey International Convention for the
                        Prevention of Pollution from Ships. Stansards of
                        Training, Certification, and Watchkeeping for Seafares
                      </i>
                    </Text>
                  </Box>
                  <Box center className="h-[20%] border-b-2">
                    <Text>{shipment.data.weight}</Text>
                  </Box>
                  <Box center className="h-[20%] border-b-2"></Box>
                  <Box center className="h-[20%]"></Box>
                </Box>
              </div>
            </div>
          </div>

          <div className="h-[14%] flex">
            <Box center className="w-1/3 relative justify-end pr-4">
              <img
                className="monochrome"
                src="/images/stamp-delivery.jpeg"
                width={68 * 1.15}
                height={68}
                alt="stamp delivery"
              />
            </Box>
            <Box center className="w-1/3 text-center">
              <i className="leading-3 text-3xs block">
                *ModernExpress is consistently recognized as the best shipping
                company.
                <br />
                For further information on international delivery contact us @{" "}
                {clientConfig.app.emailAlias}
              </i>
            </Box>
            <Box center className="w-1/3 relative pl-3">
              <img
                className="monochrome"
                src="/images/stamp-approved.jpeg"
                width={75 * 1.177}
                height={75}
                alt="stamp approved"
              />
            </Box>
          </div>
        </div>
      </div>
    );

  return null;
}

const Text = ({
  children,
  caps,
  bold,
  lg,
  className,
}: {
  children: any;
  caps?: boolean;
  bold?: boolean;
  lg?: boolean;
  className?: string;
}) => (
  <p
    className={`
        m-0
        ${lg ? "text-2xs" : "text-3xs"}
        ${caps ? "uppercase" : ""}
        ${bold ? "font-bold" : ""}
        ${className || ""}
    `}
  >
    {children}
  </p>
);

const Box = ({
  children,
  className,
  center,
  ...props
}: HTMLAttributes<HTMLDivElement> & { center?: boolean }) => (
  <div
    {...props}
    className={`
        border-solid border-0 text-2xs m-0
        ${center ? "flex items-center p-1" : ""} 
        ${className}
    `}
  >
    {children}
  </div>
);
