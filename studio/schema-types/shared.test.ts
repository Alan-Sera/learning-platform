import { describe, expect, it } from "vitest";
import { validateCourseLessons } from "./shared";

describe("Course curriculum validation", () => {
  it("allows an incomplete draft", () => expect(validateCourseLessons(undefined)).toBe(true));
  it("accepts distinct lesson references in authored order", () => {
    expect(validateCourseLessons([{ lessons: [{ _ref: "second" }, { _ref: "first" }] }])).toBe(true);
  });
  it("rejects the same lesson in different modules", () => {
    expect(validateCourseLessons([
      { lessons: [{ _ref: "lesson" }] }, { lessons: [{ _ref: "lesson" }] },
    ])).toBe("Each lesson can appear only once within a course.");
  });
  it("recognizes draft and published references to the same lesson", () => {
    expect(validateCourseLessons([{ lessons: [{ _ref: "drafts.lesson" }, { _ref: "lesson" }] }]))
      .not.toBe(true);
  });
  it("ignores unfinished references during authoring", () => {
    expect(validateCourseLessons([{ lessons: [{}] }])).toBe(true);
  });
});
