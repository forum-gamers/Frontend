import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <Container
      className="text-center flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-[#36393f] text-neutral-900 dark:text-neutral-300"
      data-aos="fade-left"
      as="section"
    >
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </Container>
  );
}
