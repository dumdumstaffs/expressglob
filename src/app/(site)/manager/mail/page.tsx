"use client";

import { trpc } from "@web/api/trpc";
import Button from "@web/components/Button";
import Input from "@web/components/Input";
import Textarea from "@web/components/Textarea";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SendMail() {
  const sendMail = trpc.mail.send.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ receiver: string; subject: string; body: string }>();

  const onSubmit = handleSubmit((data) => {
    sendMail.mutate(data);
  });

  return (
    <div>
      <div className="text-center mt-12 mx-auto w-full sm:w-8/12">
        <div>
          <h3 className="text-2xl sm:text-4xl m-0 mb-2 font-light">
            Send Mail
          </h3>
        </div>

        <Link
          href="/manager"
          className="block mb-10 uppercase text-sm font-bold tracking-widest mt-4"
        >
          &larr; Go back
        </Link>
      </div>

      <form
        onSubmit={onSubmit}
        className="max-w-screen-lg mx-auto grid gap-y-6 my-12 px-2 sm:px-0"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">
              Receiver Email
            </p>
            <Input
              label="Receiver email"
              {...register("receiver")}
              error={errors.receiver?.message}
            />
          </div>

          <div>
            <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">
              Subject
            </p>
            <Input
              label="Subject"
              {...register("subject")}
              error={errors.subject?.message}
            />
          </div>
        </div>

        <div className="grid *:!w-full">
          <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">Body</p>
          <Textarea
            label="Body"
            {...register("body")}
            error={errors.body?.message}
            rows={12}
          />
        </div>

        {sendMail.data && <p>{sendMail.data.message}</p>}

        <div className="mt-12">
          <Button type="submit" loading={sendMail.isLoading}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
