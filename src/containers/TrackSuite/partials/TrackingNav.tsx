import Link from "next/link";
import { useState } from "react";
import { Controller } from "../store";

export const TrackingNav = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const mobileToggleTrackNew = () => {
        Controller.toggleTrackNew();
        setMobileMenuOpen((open) => !open)
    }

    return (
        <nav role="navigation" aria-labelledby="menuTitle" className="relative shadow-md sm:shadow-none border-solid border-0 border-b-2 border-gray-200">
            <div className="flex justify-between items-center py-4 px-2 sm:px-4 lg:w-8/12 mx-auto">
                {/**/}
                <h2 id="menuTitle" className="text-lg text-gray-600 font-thin m-0">
                    FedEx<sup className="tracking-super-script">®</sup>&nbsp;Tracking
                </h2>
                <ul
                    role="menubar"
                    className="hidden sm:!flex justify-end items-center list-none space-x-8 m-0"
                >
                    <li role="menuitem" className="">
                        <a className="text-md cursor-pointer" onClick={Controller.toggleTrackNew}>
                            Track Another Shipment
                        </a>
                    </li>
                    <li role="menuitem" className="">
                        <Link href="/support">
                            <a className="text-md cursor-pointer">
                                Help
                            </a>
                        </Link>
                    </li>
                </ul>
                <a className="block sm:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <svg
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 29.96 122.88"
                        className="fill-current"
                        width="18px"
                        height="18px"
                    >
                        <defs>
                            <style dangerouslySetInnerHTML={{ __html: ".cls-1{fill-rule:evenodd;}" }} />
                        </defs>
                        <title>3-vertical-dots</title>
                        <path
                            className="cls-1"
                            d="M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z"
                        />
                    </svg>
                </a>
            </div>
            <div className={`${mobileMenuOpen ? "block" : "hidden"} bg-white shadow-md shadow-gray-300 sm:hidden top-[60px] absolute w-full z-10 border-solid border-0 border-t-2 border-gray-200`}>
                <a className="px-2 py-5 block text-gray-900 cursor-pointer" onClick={mobileToggleTrackNew}>Track Another Shipment</a>
                <Link href="/support">
                    <a className="px-2 py-5 block text-gray-900 cursor-pointer">Help</a>
                </Link>
            </div>
        </nav >
    )
}