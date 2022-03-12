import AdminHome from "@/containers/AdminHome";
import FedexLayout from "@/layouts/FedexLayout";
import { withServerSideAuth } from "@/utils/auth";

export default function FedexManager() {

    return (
        <FedexLayout>
            <AdminHome />
        </FedexLayout>
    )
}

export const getServerSideProps = withServerSideAuth(async (ctx, admin) => {

    return {
        props: {}
    }

}, { redirectTo: "/secure/login" })




