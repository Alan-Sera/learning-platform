// Local fixtures only: never imported into the production dataset.
const slug = (current: string) => ({ _type: "slug", current });
const ref = (_ref: string, _key: string) => ({ _type: "reference", _ref, _key });
export const fixtures = [
  { _id: "cat", _type: "category", title: "Frameworks", slug: slug("frameworks"), description: "Framework courses." },
  { _id: "author", _type: "instructor", name: "Alex", slug: slug("alex"), expertise: "Web engineering", bio: [] },
  { _id: "lesson-one", _type: "lesson", title: "First Lesson", slug: slug("first-lesson"), durationSeconds: 90, notes: [{ _key: "note", _type: "block", children: [{ _key: "span", _type: "span", text: "Teaching notes", marks: [] }], markDefs: [], style: "normal" }] },
  { _id: "lesson-two", _type: "lesson", title: "Second Lesson", slug: slug("second-lesson"), durationSeconds: 60 },
  { _id: "lesson-three", _type: "lesson", title: "Third Lesson", slug: slug("third-lesson"), durationSeconds: 120 },
  {
    _id: "course-a", _type: "course", title: "A Course", slug: slug("a-course"),
    summary: "A course summary.", level: "intermediate", price: 49, currency: "USD",
    instructor: ref("author", "instructor"), category: ref("cat", "category"),
    modules: [
      { _key: "fundamentals", _type: "module", title: "Fundamentals", lessons: [ref("lesson-two", "two"), ref("lesson-one", "one")] },
      { _key: "advanced", _type: "module", title: "Advanced", lessons: [ref("lesson-three", "three"), ref("missing-lesson", "unpublished")] },
    ],
  },
  {
    _id: "course-b", _type: "course", title: "B Course", slug: slug("b-course"),
    modules: [{ _key: "reuse", _type: "module", title: "Reused lesson", lessons: [ref("lesson-one", "one")] }],
  },
];
