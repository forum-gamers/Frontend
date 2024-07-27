import Container from "@/components/Container";
import Link from "next/link";
import LoginForm from "./components/Form";
import { LOGO_BLUE } from "@/components/images";
import PriorityImage from "@/components/PriorityImage";

export default function LoginPage() {
  return (
    <Container
      as="main"
      data-aos="fade-up"
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 mt-8"
    >
      <hgroup className="w-full max-w-md flex items-center justify-center flex-col">
        <Link prefetch href="/" className="mx-auto h-10 w-auto">
          <PriorityImage
            priority
            width={40}
            height={40}
            className="w-8 h-8 mr-2"
            src={LOGO_BLUE}
            alt="forum gamers logo"
          />
        </Link>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
          Login to your account
        </h1>
      </hgroup>

      <section className="mt-8 w-full max-w-md bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </section>
    </Container>
  );
}
