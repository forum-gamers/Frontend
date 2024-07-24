"use client";

import { useState, type ChangeEventHandler } from "react";
import { loginHandler } from "../action";
import SubmitBtn from "@/components/SubmitBtn";
import Link from "next/link";
import { swalError } from "@/lib/swal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { FormAction } from "@/interfaces";

export default function LoginForm() {
  const router = useRouter();
  const [{ email, password }, setdata] = useState({
    email: "",
    password: "",
  });

  const actionHandler: FormAction = async (formData) => {
    if (!email || !password) return;

    formData.append("email", email);
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
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@example.com"
          required
          onChange={onChangeHandler}
          pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          pattern=".{8,}"
          id="password"
          value={password}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={onChangeHandler}
        />
      </div>
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
        disabled={!email || !password}
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
