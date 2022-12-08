import { APP_NAME } from "@/data/constants"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { DropdownItem } from "../DropdownItem"
import { DropdownTrack } from "../DropdownTrack"

export const Sidebar = () => {
    const smallScreen = useMediaQuery("(max-width: 992px)")

    return (
        <div className="fxg-dropdown fxg-global-nav" style={{ height: smallScreen ? "100vh" : "inherit" }}>
            <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                <DropdownItem
                    title="Shipping"
                    tab="shipping"
                    items={[
                        { title: "Create a Shipment", href: "/create-shipment" },
                        { title: "Shipping Rates & Delivery Times", href: "/online/rating" },
                        { title: "Schedule & Manage Pickups", href: "/shipping/schedule-manage-pickups" },
                        { title: "Packing & Shipping Supplies", href: "/shipping/packing" },
                        { title: "International Shipping Guide", href: "/shipping/international" },
                        { title: "Manage a Return", href: "/shipping/returns" }
                    ]}
                    footer={{ title: "ALL SHIPPING SERVICES", href: "/shipping" }}
                />
                <DropdownTrack tab="tracking" />
                <DropdownItem
                    title="Design &amp; Print"
                    tab="design"
                    items={[
                        { title: "Explore Print, Products &amp; Design", href: "/printing/online-printing" },
                        { title: "Browse Services", href: "/office/services" },
                    ]}
                    footer={{ title: "VISIT NEW MARKETPLACE", href: "/office" }}
                />
                <DropdownItem
                    title="Locations"
                    tab="locations"
                    items={[
                        { title: "Drop Off a Package", href: "/shipping/drop-off-package" },
                        { title: "All Location Types", href: "/shipping/location" },
                    ]}
                    footer={{ title: "Find a Location", href: "/locate" }}
                />
                <DropdownItem
                    title="Support"
                    tab="support"
                    items={[
                        { title: "New Customer Center", href: "/get-started" },
                        { title: "Small Business Center", href: "/small-business" },
                        { title: `${APP_NAME.full} Service Guide`, href: "/service-guide" },
                        { title: "Account Management Tools", href: "/create-account/account-management" },
                        { title: "File a Claim", href: "/customer-support/claims" },
                        { title: "Customer Support", href: "/customer-support" },
                    ]}
                    footer={{ title: "Find a Location", href: "/locate" }}
                />
            </div>
        </div >
    )
}