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
      className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[80vh] lg:py-0"
    >
      <Link
        prefetch
        href="/"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <PriorityImage
          priority
          width={40}
          height={40}
          className="w-8 h-8 mr-2"
          src={LOGO_BLUE}
          alt="forum gamers logo"
        />
      </Link>
      <section className="w-full bg-slate-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Login to your account
          </h1>

          <LoginForm />
        </div>
      </section>
    </Container>
  );
}
