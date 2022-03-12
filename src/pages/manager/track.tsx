import FedexLayout from "@/layouts/FedexLayout";
import AdminSuite from "@/containers/AdminSuite";
import { withServerSideAuth } from "@/utils/auth";

export default function FedexManagerTrack() {

    return (
        <FedexLayout>
            <AdminSuite />
        </FedexLayout>
    )
}

export const getServerSideProps = withServerSideAuth(async (ctx, admin) => {

    return {
        props: {}
    }

}, { redirectTo: "/secure/login" })


