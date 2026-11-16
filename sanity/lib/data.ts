import "server-only";
import { sanityFetch } from "./fetch";
import {
  COURSES_QUERY, COURSE_BY_SLUG_QUERY, LESSON_BY_SLUG_QUERY,
  COURSE_LESSON_CONTEXT_QUERY, INSTRUCTORS_QUERY, INSTRUCTOR_BY_SLUG_QUERY,
  CATEGORIES_QUERY, CATEGORY_BY_SLUG_QUERY,
} from "./queries";
import { paginationParams, validateSlug } from "./params";
import type { Pagination } from "./params";

export function getCourses(pagination: Pagination = {}) {
  return sanityFetch(COURSES_QUERY, paginationParams(pagination));
}

export function getCourseBySlug(slug: string) {
  return sanityFetch(COURSE_BY_SLUG_QUERY, { slug: validateSlug(slug) });
}

export function getLessonBySlug(slug: string) {
  return sanityFetch(LESSON_BY_SLUG_QUERY, { slug: validateSlug(slug) });
}

export async function getCourseLessonContext(courseSlug: string, lessonSlug: string) {
  const result = await sanityFetch(COURSE_LESSON_CONTEXT_QUERY, {
    courseSlug: validateSlug(courseSlug), lessonSlug: validateSlug(lessonSlug),
  });
  if (!result?.course) return null;

  const matches = (result.course.modules ?? []).flatMap((module, moduleIndex) => {
    const lessonIndex = (module.lessons ?? []).findIndex((ref) => ref._ref === result._id);
    return lessonIndex < 0 ? [] : [{
      moduleKey: module._key,
      moduleTitle: module.title,
      moduleNumber: moduleIndex + 1,
      lessonNumber: lessonIndex + 1,
      lessonLabel: `Lesson ${moduleIndex + 1}.${lessonIndex + 1}`,
    }];
  });
  if (matches.length > 1) throw new Error("Lesson appears more than once in course curriculum.");
  const position = matches[0];
  if (!position) return null;
  return { lesson: result, ...position };
}

export function getInstructors(pagination: Pagination = {}) {
  return sanityFetch(INSTRUCTORS_QUERY, paginationParams(pagination));
}

export function getInstructorBySlug(slug: string) {
  return sanityFetch(INSTRUCTOR_BY_SLUG_QUERY, { slug: validateSlug(slug) });
}

export function getCategories(pagination: Pagination = {}) {
  return sanityFetch(CATEGORIES_QUERY, paginationParams(pagination));
}

export function getCategoryBySlug(slug: string) {
  return sanityFetch(CATEGORY_BY_SLUG_QUERY, { slug: validateSlug(slug) });
}
