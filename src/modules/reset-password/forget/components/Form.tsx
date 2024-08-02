"use client";

import EmailForm from "@/components/common/EmailForm";
import SubmitBtn from "@/components/common/SubmitBtn";
import type { CustomSession, FormAction } from "@/interfaces";
import { useEffect, useState, type ChangeEventHandler } from "react";
import { forgetPasswordHandler } from "../action";
import { swalError } from "@/lib/swal";
import { useRouter } from "next/navigation";
import { isInIndonesia } from "@/helpers/global";

export interface ForgetFormProps {
  session: CustomSession | null;
}

export default function ForgetForm({ session }: ForgetFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [inIndonesia, setInIndonesia] = useState<boolean>(false);

  useEffect(() => {
    if ("geolocation" in navigator)
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setInIndonesia(isInIndonesia(latitude, longitude));
      });
  }, []);

  const actionHandler: FormAction = async (formData) => {
    if (!email && !session) return;

    formData.append("email", email);
    formData.append("lang", inIndonesia ? "id" : "en");
    const { error } = await forgetPasswordHandler(formData);
    if (error) {
      swalError(error);
      return;
    }

    router.push(session ? "/" : "/login");
  };

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setEmail(e.target.value);

  return (
    <form id="forget-password-form" action={actionHandler}>
      <div className="grid gap-y-4">
        {!session && (
          <EmailForm
            onChangeHandler={onChangeHandler}
            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
            required
            value={email}
            name="email"
            id="email"
            label="Email address"
            labelClass="text-sm font-bold ml-1 mb-2 dark:text-white"
          />
        )}
        <SubmitBtn
          text="Send email verification"
          type="submit"
          disabled={!session && !email}
          className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
        />
      </div>
    </form>
  );
}
