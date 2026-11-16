import { getReadClient } from "../sanity/lib/client";
import {
  getCourses, getCourseBySlug, getLessonBySlug, getCourseLessonContext,
  getInstructors, getCategories,
} from "../sanity/lib/data";

async function main() {
  const [courses, instructors, categories] = await Promise.all([
    getCourses({ limit: 1 }), getInstructors({ limit: 1 }), getCategories({ limit: 1 }),
  ]);
  const first = courses.items[0];
  let checkedCourseLesson = false;
  if (first?.slug) {
    const course = await getCourseBySlug(first.slug);
    const lesson = course?.modules?.flatMap((module) => module.lessons ?? [])
      .find((entry) => entry.lesson?.slug)?.lesson;
    if (lesson?.slug) {
      const detail = await getLessonBySlug(lesson.slug);
      const context = await getCourseLessonContext(first.slug, lesson.slug);
      if (!detail || !context) throw new Error("Published course membership could not be resolved.");
      checkedCourseLesson = true;
    }
  }

  const drafts = await getReadClient().fetch<number>(
    'count(*[_id in path("drafts.**")])', {}, { perspective: "published", cache: "no-store" },
  );
  if (drafts !== 0) throw new Error("Published reads unexpectedly returned drafts.");

  let invalidTokenRejected = false;
  try {
    await getReadClient().withConfig({ token: "deliberately-invalid-verification-token" })
      .fetch<number>("count(*)", {}, { cache: "no-store" });
  } catch (error) {
    invalidTokenRejected = error instanceof Error && "statusCode" in error &&
      (error.statusCode === 401 || error.statusCode === 403);
  }
  if (!invalidTokenRejected) throw new Error("The invalid credential control was not rejected.");
  console.log(JSON.stringify({
    courses: courses.total, instructors: instructors.total, categories: categories.total,
    checkedCourseLesson, publishedDraftCount: drafts, invalidTokenRejected,
  }, null, 2));
}

main().catch((error: unknown) => {
  // Do not print request headers, environment values, or credentials.
  console.error(error instanceof Error ? error.name + ": Sanity read smoke check failed." : "Sanity read smoke check failed.");
  process.exitCode = 1;
});
