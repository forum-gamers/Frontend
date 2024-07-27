import Container from "@/components/common/Container";
import type { CustomSession } from "@/interfaces";
import ForgetForm from "./components/Form";
import Link from "next/link";

export interface ForgetPasswordProps {
  session: CustomSession | null;
}

export default function ForgetPassword({ session }: ForgetPasswordProps) {
  return (
    <Container
      as="main"
      data-aos="fade-left"
      className="w-full max-w-md mx-auto p-6 mt-8"
    >
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
        <div className="p-4 sm:p-7">
          <hgroup className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{" "}
              <Link
                className="text-blue-600 decoration-2 hover:underline font-medium"
                href="/login"
                prefetch
              >
                Login here
              </Link>
            </p>
          </hgroup>

          <section className="mt-5">
            <ForgetForm session={session} />
          </section>
        </div>
      </div>
    </Container>
  );
}
