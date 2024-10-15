"use client";

import { memo, useState, type ChangeEventHandler } from "react";
import { loginHandler } from "../action";
import SubmitBtn from "@/components/common/SubmitBtn";
import Link from "next/link";
import { swalError } from "@/lib/swal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { FormAction } from "@/interfaces";
import PasswordInput from "@/components/common/PasswordForm";
import { Label } from "@/components/ui/label";
import GoogleLoginBtn from "./GoogleLoginBtn";
import AnimateInput from "@/components/common/AnimateInput";
import DiscordLoginBtn from "./DiscordLoginBtn";

function LoginForm() {
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
          className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-300 after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Username / Email
        </Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <AnimateInput
            id="identifier"
            name="identifier"
            placeholder="JohnDoe / JohnDoe@gmail.com"
            onChange={onChangeHandler}
            value={identifier}
            type="text"
            required
            pattern="^\S{3,}$"
            title="identifier must be at least 3 characters long and must not contain spaces."
            className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:blue-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <PasswordInput
        onChangeHandler={onChangeHandler}
        id="password"
        name="password"
        className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:blue-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          className="text-sm font-medium text-blue-500 hover:underline"
        >
          Forgot password?
        </Link>
      </div>
      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
        <p className="mx-4 mb-0 text-center text-sm dark:text-neutral-200">
          OR
        </p>
      </div>
      <div className="container mt-2 cursor-pointer align-middle mx-auto flex justify-center items-center gap-3">
        <GoogleLoginBtn />
        <DiscordLoginBtn />
      </div>
      <SubmitBtn
        type="submit"
        text="sign in"
        disabled={!identifier || !password}
        className="w-full flex justify-center items-center shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
      />
      <p className="text-sm text-center text-gray-500 dark:text-gray-400">
        Not register yet?{" "}
        <Link
          prefetch
          href="/register"
          className="font-medium text-blue-500 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default memo(LoginForm);
