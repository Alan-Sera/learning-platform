import { defineField } from "sanity";

export function slugField(source: string) {
  return defineField({
    name: "slug",
    type: "slug",
    options: { source, maxLength: 96 },
    validation: (rule) => rule.required().custom((value) =>
      !value?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)
        ? true : "Use lowercase letters, numbers, and single hyphens.",
    ),
  });
}

export const studentCountField = defineField({
  name: "studentCount",
  type: "number",
  initialValue: 0,
  validation: (rule) => rule.integer().min(0),
});

export interface CourseModuleValue { lessons?: { _ref?: string }[] }

export function validateCourseLessons(modules: CourseModuleValue[] | undefined): true | string {
  const seen = new Set<string>();
  for (const module of modules ?? []) {
    for (const lesson of module.lessons ?? []) {
      if (!lesson._ref) continue;
      const id = lesson._ref.replace(/^drafts\./, "");
      if (seen.has(id)) return "Each lesson can appear only once within a course.";
      seen.add(id);
    }
  }
  return true;
}
