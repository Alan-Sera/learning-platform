import type { CourseCardProps } from "@/components/cards/course-card";

type HomeCourse = Pick<CourseCardProps, "title" | "description" | "level" | "duration" | "modules"> & {
  id: string;
  image: NonNullable<CourseCardProps["image"]>;
};

export const homeCourses: readonly HomeCourse[] = [
  {
    id: "nextjs",
    title: "Next.js for Production",
    description: "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate", duration: "18h 24m", modules: "12 modules",
    image: { src: "/images/vertex/nextjs.svg", alt: "Next.js logo", width: 180, height: 180 },
  },
  {
    id: "docker",
    title: "Docker Essentials",
    description: "Containerize applications and streamline your development workflow.",
    level: "Beginner", duration: "10h 12m", modules: "8 modules",
    image: { src: "/images/vertex/docker.svg", alt: "Docker logo", width: 340, height: 268 },
  },
  {
    id: "typescript",
    title: "TypeScript Deep Dive",
    description: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate", duration: "14h 36m", modules: "10 modules",
    image: { src: "/images/vertex/typescript.svg", alt: "TypeScript logo", width: 512, height: 512 },
  },
];
