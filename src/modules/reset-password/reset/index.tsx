import PriorityImage from "@/components/PriorityImage";
import Link from "next/link";
import { LOGO_BLUE } from "@/components/images";
import Container from "@/components/Container";
import ResetForm from "./components/Form";

export interface ResetFormProps {
  token: string;
}

export default function Reset({ token }: ResetFormProps) {
  return (
    <Container
      as="main"
      data-aos="fade-down"
      className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <Link
        href="/"
        prefetch
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
        Forum Gamer
      </Link>
      <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Change Password
        </h2>
        <ResetForm token={token} />
      </div>
    </Container>
  );
}
