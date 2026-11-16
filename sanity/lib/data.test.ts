import { beforeEach, describe, expect, it, vi } from "vitest";
import { evaluate, parse } from "groq-js";
import { fixtures } from "./fixtures.test-data";
vi.mock("server-only", () => ({}));
vi.mock("./fetch", () => ({
  sanityFetch: vi.fn(async (query: string, params: Record<string, unknown>) =>
    (await evaluate(parse(query, { params }), { dataset: fixtures, params })).get()),
}));
import { sanityFetch } from "./fetch";
import { getCourseBySlug, getCourses, getCourseLessonContext } from "./data";
import { paginationParams } from "./params";

beforeEach(() => vi.clearAllMocks());

describe("Server content API", () => {
  it("derives lesson numbers from the selected course's authored array order", async () => {
    expect(await getCourseLessonContext("a-course", "first-lesson")).toMatchObject({
      moduleKey: "fundamentals", moduleNumber: 1, lessonNumber: 2, lessonLabel: "Lesson 1.2",
    });
    expect(await getCourseLessonContext("b-course", "first-lesson")).toMatchObject({
      moduleNumber: 1, lessonNumber: 1, lessonLabel: "Lesson 1.1",
    });
  });
  it("returns null when the lesson is absent or not in the selected course", async () => {
    expect(await getCourseLessonContext("b-course", "third-lesson")).toBeNull();
    expect(await getCourseLessonContext("a-course", "missing")).toBeNull();
  });
  it("rejects invalid slugs before querying", () => {
    expect(() => getCourseBySlug('a"] | *')).toThrow("Invalid content slug");
    expect(sanityFetch).not.toHaveBeenCalled();
  });
  it.each([{ limit: 0 }, { limit: 101 }, { offset: -1 }, { offset: 0.5 }, { limit: Number.NaN }])(
    "rejects invalid pagination", (params) => {
      expect(() => paginationParams(params)).toThrow(RangeError);
    },
  );
  it("keeps API failures distinct from missing content", async () => {
    vi.mocked(sanityFetch).mockRejectedValueOnce(new Error("Access denied"));
    await expect(getCourses()).rejects.toThrow("Access denied");
  });
});
