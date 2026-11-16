import { describe, expect, it } from "vitest";
import { evaluate, parse } from "groq-js";
import {
  COURSES_QUERY, COURSE_BY_SLUG_QUERY, LESSON_BY_SLUG_QUERY,
  COURSE_LESSON_CONTEXT_QUERY, INSTRUCTORS_QUERY, INSTRUCTOR_BY_SLUG_QUERY,
  CATEGORIES_QUERY, CATEGORY_BY_SLUG_QUERY,
} from "./queries";
import { fixtures } from "./fixtures.test-data";

async function run(query: string, params = {}): Promise<unknown> {
  return (await evaluate(parse(query, { params }), { dataset: fixtures, params })).get();
}

describe("Content GROQ projections", () => {
  it("paginates after stable ordering and returns the full count", async () => {
    expect(await run(COURSES_QUERY, { start: 1, end: 2 })).toMatchObject({
      total: 2, items: [{ _id: "course-b", title: "B Course" }],
    });
  });

  it("resolves references, preserves author order, and excludes missing lessons from totals", async () => {
    expect(await run(COURSE_BY_SLUG_QUERY, { slug: "a-course" })).toMatchObject({
      instructor: { name: "Alex" }, category: { title: "Frameworks" },
      moduleCount: 2, lessonCount: 3, totalDurationSeconds: 270,
      modules: [
        { _key: "fundamentals", lessons: [
          { _key: "two", lesson: { _id: "lesson-two" } },
          { _key: "one", lesson: { _id: "lesson-one" } },
        ] },
        { _key: "advanced", lessons: [
          { lesson: { _id: "lesson-three" } }, { lesson: null },
        ] },
      ],
    });
  });

  it("does not include teaching notes in catalog or course summaries", async () => {
    const list = JSON.stringify(await run(COURSES_QUERY, { start: 0, end: 24 }));
    const course = JSON.stringify(await run(COURSE_BY_SLUG_QUERY, { slug: "a-course" }));
    expect(list).not.toContain("Teaching notes");
    expect(course).not.toContain("Teaching notes");
  });

  it("finds every parent course by reverse reference without a stored parent", async () => {
    expect(await run(LESSON_BY_SLUG_QUERY, { slug: "first-lesson" })).toMatchObject({
      _id: "lesson-one", courses: [{ slug: "a-course" }, { slug: "b-course" }],
    });
  });

  it("resolves only the supplied course for a reused lesson", async () => {
    expect(await run(COURSE_LESSON_CONTEXT_QUERY, { courseSlug: "b-course", lessonSlug: "first-lesson" }))
      .toMatchObject({ course: { _id: "course-b" } });
    expect(await run(COURSE_LESSON_CONTEXT_QUERY, { courseSlug: "b-course", lessonSlug: "third-lesson" }))
      .toMatchObject({ course: null });
  });

  it.each([COURSE_BY_SLUG_QUERY, LESSON_BY_SLUG_QUERY, INSTRUCTOR_BY_SLUG_QUERY, CATEGORY_BY_SLUG_QUERY])(
    "returns null for a missing detail", async (query) => {
      expect(await run(query, { slug: "missing" })).toBeNull();
    },
  );

  it.each([COURSES_QUERY, INSTRUCTORS_QUERY, CATEGORIES_QUERY])(
    "returns an empty page with the real total beyond the end", async (query) => {
      expect(await run(query, { start: 100, end: 124 })).toMatchObject({ items: [] });
    },
  );
});
