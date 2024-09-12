"use client";

import useMount from "@/hooks/useMounted";
import { memo, useCallback } from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { swalError } from "@/lib/swal";
import { googleLogin } from "../action";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import GoogleOauth from "@/providers/GoogleOauth";

function GoogleLoginBtn() {
  const router = useRouter();
  const mount = useMount();

  const googleSubmit = useCallback(
    async ({ credential }: CredentialResponse) => {
      if (!credential) return;
      const { error, data } = await googleLogin(credential);
      if (error) {
        swalError(error || "unexpected error");
        return;
      }

      if (data) {
        await signIn("credentials", { access_token: data, redirect: false });
        router.push("/");
        return;
      }

      swalError("Something went wrong");
    },
    [router, mount]
  );

  if (!mount) return null;

  return (
    <GoogleOauth>
      <GoogleLogin
        onSuccess={googleSubmit}
        useOneTap
        cancel_on_tap_outside
        onError={() => {
          swalError("Failed sign in with google");
        }}
        text="signin_with"
        shape="circle"
        size="medium"
        context="signin"
      />
    </GoogleOauth>
  );
}

export default memo(GoogleLoginBtn);
