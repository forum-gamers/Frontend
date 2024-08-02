"use client";

import SubmitBtn from "@/components/common/SubmitBtn";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { FormAction } from "@/interfaces";
import { useState, type ChangeEventHandler } from "react";
import { registerHandler } from "../action";
import { swalError } from "@/lib/swal";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/common/PasswordForm";
import { signIn } from "next-auth/react";
import EmailForm from "@/components/common/EmailForm";

export default function RegisterForm() {
  const router = useRouter();
  const [{ username, email, password, phoneNumber, confirmPassword }, setData] =
    useState({
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
    });

  const actionHandler: FormAction = async (formData) => {
    if (!username || !email || !password || !phoneNumber || !confirmPassword)
      return;

    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("confirmPassword", confirmPassword);

    const { data, error } = await registerHandler(formData);
    if (error) {
      swalError(error);
      return;
    }

    if (data) {
      await signIn("credentials", {
        access_token: data.token,
        redirect: false,
      });
      router.push("/");
      return;
    }

    swalError("Something went wrong");
  };

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form action={actionHandler} id="register-form">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label
          htmlFor="username"
          className="block text-sm font-medium leading-5 text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Username
        </Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <Input
            id="username"
            name="username"
            placeholder="John Doe"
            onChange={onChangeHandler}
            value={username}
            type="text"
            required
            pattern="^\S{3,}$"
            title="Username must be at least 3 characters long and must not contain spaces."
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
      </div>

      <EmailForm
        onChangeHandler={onChangeHandler}
        id="email"
        name="email"
        value={email}
        required
        label="Email Address"
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        labelClass="text-sm font-medium leading-5 text-gray-700"
      />

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label
          htmlFor="phone"
          className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium leading-5 text-gray-700"
        >
          Phone number
        </Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <Input
            id="phone"
            pattern="^\d{10,15}$"
            title="Phone number must be between 10 to 15 digits long and must not contain spaces."
            value={phoneNumber}
            onChange={onChangeHandler}
            name="phoneNumber"
            placeholder="0123456789"
            type="text"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
      </div>

      <PasswordInput
        id="password"
        name="password"
        value={password}
        onChangeHandler={onChangeHandler}
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        title="Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
        className="appearance-none mt-1 shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        label="Password"
        required
        labelClass="text-sm font-medium leading-5 text-gray-700"
      />

      <PasswordInput
        required
        id="password_confirmation"
        name="confirmPassword"
        value={confirmPassword}
        onChangeHandler={onChangeHandler}
        pattern={password}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        label="Confirm Password"
        labelClass="text-sm font-medium leading-5 text-gray-700"
      />

      {confirmPassword !== password && (
        <p className="text-red-500 text-xs col-span-2 m-0 p-0 flex justify-center">
          password is not equal with confirm password
        </p>
      )}

      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <SubmitBtn
            text="Create account"
            type="submit"
            disabled={
              !username ||
              !email ||
              !password ||
              !confirmPassword ||
              confirmPassword !== password ||
              !phoneNumber
            }
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          />
        </span>
      </div>
    </form>
  );
}
