"use client";

import { Settings } from "@shared/types/settings";
import { trpc } from "@web/api/trpc";
import Button from "@web/components/Button";
import Input from "@web/components/Input";
import { Loader } from "@web/components/Loader";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function UpdateSettings() {
  const settings = trpc.settings.get.useQuery();

  if (settings.isLoading) {
    return <Loader />;
  }

  return <UpdateForm initialValue={settings.data} />;
}

const UpdateForm = (props: { initialValue?: Settings }) => {
  const utils = trpc.useUtils();
  const updateSettings = trpc.settings.update.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ whatsapp: string }>({
    defaultValues: props.initialValue,
  });

  const onSubmit = handleSubmit((data) => {
    updateSettings.mutate(data, {
      onSuccess() {
        utils.settings.get.invalidate();
      },
    });
  });

  return (
    <div>
      <div className="text-center mt-12 mx-auto w-full sm:w-8/12">
        <div>
          <h3 className="text-2xl sm:text-4xl m-0 mb-2 font-light">Settings</h3>
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
        <div>
          <p className="text-gray-600 text-sm font-semibold p-2 sm:p-4">
            Whatsapp number
          </p>
          <Input
            label="Whatsapp number"
            {...register("whatsapp")}
            error={errors.whatsapp?.message}
            required={false}
          />
        </div>

        {updateSettings.data && <p>{updateSettings.data.message}</p>}

        <div className="mt-12">
          <Button type="submit" loading={updateSettings.isLoading}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};
