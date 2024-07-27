import Container from "@/components/common/Container";
import RegisterForm from "./components/Form";
import Link from "next/link";
import { LOGO_BLUE } from "@/components/images";
import PriorityImage from "@/components/common/PriorityImage";

export default function RegisterPage() {
  return (
    <Container
      data-aos="fade-up"
      as="main"
      className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[80vh] lg:py-0"
    >
      <hgroup className="sm:mx-auto sm:w-full sm:max-w-md">
        <PriorityImage
          height={40}
          width={40}
          className="mx-auto h-10 w-auto"
          src={LOGO_BLUE}
          alt="forum gamer logo"
        />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w gap-4">
          Or{" "}
          <Link
            prefetch
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            login to your account
          </Link>
        </p>
      </hgroup>

      <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegisterForm />
        </div>
      </section>
    </Container>
  );
}
