import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FedexLayout from "@/layouts/FedexLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { withServerSideAuth } from "@/utils/auth";
import { useLoginMutation } from "@/queries/auth";
import AuthSchema, { AdminLoginDto } from "@/schemas/misc/auth";
import Link from "next/link";

export default function Login() {
    const loginMutation = useLoginMutation()

    const { handleSubmit, register, formState: { errors } } = useForm<AdminLoginDto>({
        resolver: yupResolver(AuthSchema.login)
    })

    const onSubmit = handleSubmit((data) => {
        loginMutation.mutate(data)
    })

    return (
        <FedexLayout>
            <div className="py-16 p-2 text-center">
                <div className="mb-10">
                    <h1
                        id="title"
                        className="text-2xl sm:text-4xl"
                    >
                        Enter your user ID and password to log in
                    </h1>
                </div>
                <a
                    className="block mb-10 uppercase text-sm font-bold tracking-widest"
                    aria-label="CUSTOMER SUPPORT"
                >
                    Login user
                </a>
                <form
                    className="fxg-form tw-form"
                    onSubmit={onSubmit}
                >
                    <Input label="User ID" {...register("email")} error={errors.email?.message} />
                    <Input type="password" label="Password" {...register("password")} error={errors.password?.message} />

                    <p className="text-red-400 !my-6 text-center">{loginMutation.isError && loginMutation.axiosError?.response.data.message}</p>

                    <Button type="submit" loading={loginMutation.isLoading}>Log In</Button>
                </form>
                <div className="mt-8">
                    <p className="text-2xl font-thin mb-4">
                        Need help?
                    </p>
                    <Link href="/support">
                        <a className="block uppercase text-sm font-bold tracking-widest">
                            Customer Support
                        </a>
                    </Link>
                </div>
            </div>
        </FedexLayout>
    )
}

export const getServerSideProps = withServerSideAuth(async (ctx, admin) => {

    return {
        props: {}
    }

}, { mode: "guest", redirectTo: "/manager" })