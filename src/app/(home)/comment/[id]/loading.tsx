import Breakline from "@/components/common/Breakline";
import Container from "@/components/common/Container";
import SkeletonCard from "@/components/common/SkeletonCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container as="div">
      <Skeleton />
      <SkeletonCard />
      <Breakline className="mb-4" />
      <SkeletonCard />
      <Breakline className="mb-4" />
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </Container>
  );
}
