"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import AuthSchema from "@shared/schemas/auth";
import { trpc } from "@web/api/trpc";
import Button from "@web/components/Button";
import Input from "@web/components/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
  const loginMutation = trpc.auth.login.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.input<typeof AuthSchema.login>>({
    resolver: zodResolver(AuthSchema.login),
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return (
    <div className="py-16 p-2 text-center">
      <div className="mb-10">
        <h1 id="title" className="text-2xl sm:text-4xl">
          Enter your user ID and password to log in
        </h1>
      </div>
      <a
        className="block mb-10 uppercase text-sm font-bold tracking-widest"
        aria-label="CUSTOMER SUPPORT"
      >
        Login user
      </a>
      <form className="fxg-form tw-form" onSubmit={onSubmit}>
        <Input
          label="User ID"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          type="password"
          label="Password"
          {...register("password")}
          error={errors.password?.message}
        />

        <p className="text-red-400 !my-6 text-center">
          {loginMutation.isError && loginMutation.error.message}
        </p>

        <Button type="submit" loading={loginMutation.isLoading}>
          Log In
        </Button>
      </form>
      <div className="mt-8">
        <p className="text-2xl font-thin mb-4">Need help?</p>
        <Link
          href="/support"
          className="block uppercase text-sm font-bold tracking-widest"
        >
          Customer Support
        </Link>
      </div>
    </div>
  );
}
