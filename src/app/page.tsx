import { HomePageCard } from "@/components/page/HomePageCard";
import { getAllPosts } from "@/entities/post/model/posts";

export default function Home() {
  const posts = getAllPosts();
  const [featuredPost, ...recentPosts] = posts;

  return <HomePageCard featuredPost={featuredPost} recentPosts={recentPosts} />;
}
