import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Bell, Star } from "lucide-react";
import { Navbar } from "@/components/nav/navbar";
import { CourseCard } from "@/components/cards/course-card";
import { HomeSearch } from "@/components/home/home-search";
import { buttonStyles } from "@/components/ui/button";
import { homeCourses } from "@/lib/home-courses";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Vertex — Search your learning in plain English",
  description: "Explore courses on Next.js, Docker, and TypeScript. New courses and lessons added every week.",
};

export default function Home() {
  return <div className={styles.canvas}>
    <div className={styles.frame}>
      <header className={styles.header}>
        <Navbar variant="home" logoHref="/" items={[{ label: "Courses", href: "#courses" }, { label: "My Learning" }]}
          actions={<><Bell aria-hidden="true" size={24} strokeWidth={1.5} /><Image src="/images/vertex/avatar.jpg" alt="Sample profile portrait" width={50} height={50} className={styles.avatar} loading="eager" /></>} />
      </header>
      <main>
        <section className={styles.hero} aria-labelledby="hero-heading">
          <p className={styles.eyebrow}>Intelligent Learning</p>
          <h1 id="hero-heading" className={styles.heading}>Search your learning<br />in plain English.</h1>
          <p className={styles.subtitle}>Vertex understands what you want to learn and finds the exact lessons across all your courses.</p>
          <a href="#courses" className={buttonStyles({ className: styles.cta })}>Explore Courses<ArrowRight size={24} strokeWidth={1.5} aria-hidden="true" /></a>
          <div className={styles.search}><HomeSearch /></div>
        </section>
        <section id="courses" className={styles.courses} aria-labelledby="courses-heading">
          <div className={styles.sectionHeading}>
            <h2 id="courses-heading">All Courses</h2>
            <a href="#courses">View all courses<ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" /></a>
          </div>
          <div className={styles.grid}>{homeCourses.map(course => <CourseCard key={course.id} {...course} variant="catalog" />)}</div>
          <div className={styles.note}><Star size={24} strokeWidth={1.25} aria-hidden="true" /><p>New courses and lessons added every week.</p></div>
        </section>
        <div className={styles.decoration} aria-hidden="true"><div className={styles.bars}>{[88, 122, 152, 188, 134, 98, 0, 0, 64, 86, 116, 152, 188, 96, 134, 168].map((height, index) => <span key={index} style={{ height }} />)}</div></div>
      </main>
    </div>
  </div>;
}
