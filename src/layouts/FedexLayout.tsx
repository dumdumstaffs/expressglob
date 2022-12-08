import { ReactNode } from "react"
import Footer from "@/containers/Footer"
import Header from "@/containers/Header"
import Head from "next/head"
import { APP_NAME } from "@/data/constants"

type Props = {
    title?: string;
    children: ReactNode
}

export default function FedexLayout({ children, title }: Props) {
    return (
        <>
            <Head>
                <title>{title || `${APP_NAME.full} | Tracking, Shipping, and Locations`}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
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