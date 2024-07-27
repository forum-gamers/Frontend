import Container from "@/components/common/Container";
import PostCard from "@/components/common/PostCard";
import type { PostAttributes } from "@/interfaces/model";

export interface HomeProps {
  datas: PostAttributes[];
}

export default function Home({ datas }: HomeProps) {
  return (
    <Container as="section">
      <PostCard
        data={{
          id: 31,
          userId: "24e8d328-c0ef-4e3c-b184-b21b155e7809",
          username: "feexz",
          userImageUrl: "",
          userBio: "ngetes bio",
          text: "test file banyak",
          allowComment: true,
          createdAt: "2024-07-22T02:17:12.289Z",
          updatedAt: "2024-07-22T03:02:15.317Z",
          privacy: "public",
          communityId: null,
          medias: [
            {
              fileId: "669dc129e375273f60241b2e",
              url: "https://ik.imagekit.io/b8ugipzgo/post-image/Abstract-Website-Background_dMn8nh9I7.jpg",
              type: "image",
            },
            {
              fileId: "669dc129e375273f60241b9a",
              url: "https://ik.imagekit.io/b8ugipzgo/post-image/aplikasi_serene_PoaSYWtmQ.png",
              type: "image",
            },
            {
              fileId: "669dc129e375273f60241d01",
              url: "https://ik.imagekit.io/b8ugipzgo/post-image/BD_-_Logo_w6fXsqGyj.png",
              type: "image",
            },
            {
              fileId: "669dc129e375273f60241bfc",
              url: "https://ik.imagekit.io/b8ugipzgo/post-image/blockchain_wCQT1TZD7.png",
              type: "image",
            },
          ],
          countLike: 1,
          countComment: 4,
          countShare: 0,
          isLiked: true,
          isShared: false,
          community: null,
        }}
      />
    </Container>
  );
}
