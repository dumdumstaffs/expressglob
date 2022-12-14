import { ReactNode } from "react"
import Footer from "@/containers/Footer"
import Header from "@/containers/Header"
import Head from "next/head"

type Props = {
    title?: string;
    children: ReactNode
}

export default function FedexLayout({ children, title }: Props) {
    return (
        <>
            <Head>
                <title>{title || "ExpressGlob | Tracking, Shipping, and Locations"}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <meta name="description" content="Use the Fedex.com site to login to your ExpressGlob account, get your tracking status, find a ExpressGlob near you, learn more about how to become a better shipper, get online print offers, or get inspiration for your small business needs. " /> */}
            </Head>
            <div className="fxg-main-content">
                <Header />
                <div className="root responsivegrid">
                    <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                        <div className="responsivegrid aem-GridColumn--default--none aem-GridColumn aem-GridColumn--default--12 aem-GridColumn--offset--default--0">
                            <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}