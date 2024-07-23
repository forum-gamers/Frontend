import Container from "@/components/Container";
import Link from "next/link";
import LoginForm from "./components/Form";

export default function LoginPage() {
  return (
    <Container
      as="main"
      data-aos="fade-up"
      className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <Link
        prefetch
        href="/"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          className="w-8 h-8 mr-2"
          src="https://www.svgrepo.com/show/335276/oldelectrum-logo.svg"
          alt="osher.ai logo"
        />
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Sign In Access
          </h1>
          <h2 className="text-center">
            {" "}
            You must become a member to Login and access{" "}
          </h2>
          <h2 className="text-center "> the entire site</h2>

          <LoginForm />
        </div>
      </div>
    </Container>
  );
}
