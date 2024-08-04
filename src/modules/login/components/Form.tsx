"use client";

import { useState, type ChangeEventHandler } from "react";
import { loginHandler } from "../action";
import SubmitBtn from "@/components/common/SubmitBtn";
import Link from "next/link";
import { swalError } from "@/lib/swal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { FormAction } from "@/interfaces";
import PasswordInput from "@/components/common/PasswordForm";
import EmailForm from "@/components/common/EmailForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const router = useRouter();
  const [{ identifier, password }, setdata] = useState({
    identifier: "",
    password: "",
  });

  const actionHandler: FormAction = async (formData) => {
    if (!identifier || !password) return;

    formData.append("identifier", identifier);
    formData.append("password", password);

    const { data, error } = await loginHandler(formData);
    if (error) {
      swalError(error || "Something went wrong");
      return;
    }

    if (data) {
      await signIn("credentials", { access_token: data, redirect: false });
      router.push("/");
      return;
    }

    swalError("Something went wrong");
  };

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="space-y-4 md:space-y-6"
      action={actionHandler}
      id="login-form"
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label
          htmlFor="identifier"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Username / Email
        </Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <Input
            id="identifier"
            name="identifier"
            placeholder="JohnDoe / JohnDoe@gmail.com"
            onChange={onChangeHandler}
            value={identifier}
            type="text"
            required
            pattern="^\S{3,}$"
            title="identifier must be at least 3 characters long and must not contain spaces."
            className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <PasswordInput
        onChangeHandler={onChangeHandler}
        id="password"
        name="password"
        value={password}
        required
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        label="Password"
        labelClass="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-start"></div>
        <Link
          prefetch
          href="/forget-password"
          className="text-sm font-medium text-teal-600 hover:underline dark:text-teal-500"
        >
          Forgot password?
        </Link>
      </div>

      <SubmitBtn
        type="submit"
        text="sign in"
        disabled={!identifier || !password}
        className="w-full flex justify-center items-center shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
      />

      <p className="text-sm text-center text-gray-500 dark:text-gray-400">
        Not a register yet?{" "}
        <Link
          prefetch
          href="/register"
          className="font-medium text-[#0000EE] hover:underline dark:text-teal-500"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
