import Container from "@/components/common/Container";
import SkeletonCard from "@/components/common/SkeletonCard";

export default function Loading() {
  return (
    <Container as="div" className="space-y-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </Container>
  );
}
