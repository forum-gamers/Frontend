import Container from "@/components/common/Container";
import Link from "next/link";

export default function Page() {
  return (
    <Container className="text-center !mt-48" data-aos="fade-left" as="section">
      <hgroup>
        <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-lg text-gray-600 font-sora">
          {" Oops! Looks like you're lost."}
        </p>
      </hgroup>
      <figure className="animate-bounce">
        <svg
          className="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </figure>
      <p className="mt-4 text-gray-600 font-sora">
        {"Let's get you back"}{" "}
        <Link href="/" className="text-blue-500">
          home
        </Link>
        .
      </p>
    </Container>
  );
}
