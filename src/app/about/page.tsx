import type { Metadata } from "next";
import { AboutPageCard } from "@/components/page/AboutPageCard";

export const metadata: Metadata = {
  title: "About",
  description: "Developer Blog의 목적과 Writing Voice를 소개합니다.",
};

export default function AboutPage() {
  return <AboutPageCard />;
}
