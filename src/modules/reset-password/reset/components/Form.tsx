"use client";

import PasswordForm from "@/components/common/PasswordForm";
import SubmitBtn from "@/components/common/SubmitBtn";
import type { FormAction } from "@/interfaces";
import { memo, useState, type ChangeEventHandler } from "react";
import { resetPasswordHandler } from "../action";
import { swalError } from "@/lib/swal";
import { useRouter } from "next/navigation";
import useCsrf from "@/hooks/useCsrf";

export interface ResetFormProps {
  token: string;
}

function ResetForm({ token }: ResetFormProps) {
  const csrf = useCsrf();
  const router = useRouter();
  const [{ password, confirmPassword }, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const actionHandler: FormAction = async (formData) => {
    if (!password || !confirmPassword || formData.get("csrf") !== token) return;

    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("token", token);

    const { error } = await resetPasswordHandler(formData);
    if (error) {
      swalError(error);
      return;
    }
    router.push("/login");
  };

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
      action={actionHandler}
    >
      <input type="hidden" name="csrf" value={csrf} id="csrf" />
      <PasswordForm
        id="password"
        name="password"
        label="Password"
        value={password}
        onChangeHandler={onChangeHandler}
        required
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        placeHolder="..........."
        labelClass="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      />
      <PasswordForm
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        value={confirmPassword}
        onChangeHandler={onChangeHandler}
        required
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        placeHolder="..........."
        labelClass="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      />

      {confirmPassword !== password && (
        <p className="text-red-500 text-xs col-span-2 m-0 p-0 flex justify-center">
          password is not equal with confirm password
        </p>
      )}

      <SubmitBtn
        type="submit"
        text="Reset password"
        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
      />
    </form>
  );
}

export default memo(ResetForm);
