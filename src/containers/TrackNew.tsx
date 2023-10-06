import { zodResolver } from "@hookform/resolvers/zod";
import TrackSchema from "@shared/schemas/track";
import Button from "@web/components/Button";
import Input from "@web/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const TrackNew = ({
  url,
  onTrack,
}: {
  url: string;
  onTrack: () => void;
}) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<z.input<typeof TrackSchema.track>>({
    resolver: zodResolver(TrackSchema.track),
  });

  const onSubmit = handleSubmit(({ trackingId }) => {
    router.push(url + "?" + new URLSearchParams({ trackingId }));
    onTrack();
  });

  useEffect(() => {
    setFocus("trackingId");
  }, [setFocus]);

  return (
    <div className="border-solid border-0 border-b border-gray-200 pb-12 px-1 sm:px-0">
      <div className="flex justify-end items-center my-8 mx-auto sm:w-[70%]">
        <button
          className="appearance-none border-none outline-none bg-transparent"
          aria-label="Close track another shipment."
          onClick={onTrack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            viewBox="0 0 256 256"
            xmlSpace="preserve"
            className="w-6 h-6"
          >
            <desc>Created with Fabric.js 1.7.22</desc>
            <defs></defs>
            <g transform="translate(128 128) scale(0.72 0.72)" style={{}}>
              <g
                style={{
                  stroke: "none",
                  strokeWidth: 0,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "none",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)"
              >
                <path
                  d="M 3 90 c -0.768 0 -1.536 -0.293 -2.121 -0.879 c -1.172 -1.171 -1.172 -3.071 0 -4.242 l 84 -84 c 1.172 -1.172 3.07 -1.172 4.242 0 c 1.172 1.171 1.172 3.071 0 4.242 l -84 84 C 4.536 89.707 3.768 90 3 90 z"
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "rgb(0,0,0)",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
                <path
                  d="M 87 90 c -0.768 0 -1.535 -0.293 -2.121 -0.879 l -84 -84 c -1.172 -1.171 -1.172 -3.071 0 -4.242 c 1.171 -1.172 3.071 -1.172 4.242 0 l 84 84 c 1.172 1.171 1.172 3.071 0 4.242 C 88.535 89.707 87.768 90 87 90 z"
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "rgb(0,0,0)",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
              </g>
            </g>
          </svg>
        </button>
      </div>
      <form onSubmit={onSubmit} className="mx-auto w-full max-w-[600px]">
        <h2 className="text-center text-xl font-thin sm:mx-[75px] mt-[20px] mb-[25px]">
          Enter up to 30 of your ModernExpress tracking, door tag, or
          ModernExpress Office order numbers (one per line).
        </h2>
        <Input
          label="Tracking Number"
          {...register("trackingId")}
          error={errors.trackingId?.message}
        />
        <Link
          href="/support"
          className="block uppercase mt-4 text-sm font-bold tracking-widest"
        >
          NEED HELP?
        </Link>
        <div className="text-right">
          <Button type="submit" loading={isSubmitting}>
            Track
          </Button>
        </div>
      </form>
    </div>
  );
};
