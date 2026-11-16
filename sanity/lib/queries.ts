import { defineQuery } from "next-sanity";

// Explicit projections keep internal fields and large lesson notes out of lists.
const imageFields = `_type, alt, crop, hotspot,
  asset->{_id, url, metadata{lqip, dimensions{width, height, aspectRatio}}}`;
const instructorSummaryFields = `_id, name, "slug": slug.current, expertise, photo{${imageFields}}`;
const categoryFields = `_id, title, "slug": slug.current, description`;
const courseSummaryFields = `
  _id, title, "slug": slug.current, summary, level, price, currency,
  "popular": coalesce(popular, false), "studentCount": coalesce(studentCount, 0),
  coverImage{${imageFields}},
  instructor->{${instructorSummaryFields}},
  category->{${categoryFields}},
  "moduleCount": count(modules),
  "lessonCount": count((modules[].lessons[]->_id)[defined(@)]),
  "totalDurationSeconds": coalesce(math::sum(modules[].lessons[]->durationSeconds), 0)
`;
const lessonSummaryFields = `
  _id, title, "slug": slug.current, durationSeconds,
  "freePreview": coalesce(freePreview, false),
  "studentCount": coalesce(studentCount, 0), poster{${imageFields}}
`;
const lessonFields = `
  ${lessonSummaryFields}, videoUrl, notes, keyPoints, proTip,
  resources[]{_key, _type, type, title, description, url}
`;

export const COURSES_QUERY = defineQuery(`{
  "items": *[_type == "course" && defined(slug.current)] | order(title asc, _id asc)[$start...$end]{
    ${courseSummaryFields}
  },
  "total": count(*[_type == "course" && defined(slug.current)])
}`);

export const COURSE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0]{
    ${courseSummaryFields},
    learningOutcomes[]{_key, _type, icon, title, description},
    modules[]{
      _key, _type, title, summary,
      lessons[]{_key, "lesson": @->{${lessonSummaryFields}}}
    }
  }
`);

export const LESSON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0]{
    ${lessonFields},
    "courses": *[_type == "course" && references(^._id)] | order(title asc, _id asc){
      _id, title, "slug": slug.current
    }
  }
`);

export const COURSE_LESSON_CONTEXT_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $lessonSlug][0]{
    ${lessonFields},
    "course": *[_type == "course" && slug.current == $courseSlug && references(^._id)][0]{
      _id, title, "slug": slug.current,
      instructor->{${instructorSummaryFields}},
      modules[]{_key, title, lessons[]{_key, _ref}}
    }
  }
`);

export const INSTRUCTORS_QUERY = defineQuery(`{
  "items": *[_type == "instructor" && defined(slug.current)] | order(name asc, _id asc)[$start...$end]{
    ${instructorSummaryFields}
  },
  "total": count(*[_type == "instructor" && defined(slug.current)])
}`);

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "instructor" && slug.current == $slug][0]{
    ${instructorSummaryFields}, bio
  }
`);

export const CATEGORIES_QUERY = defineQuery(`{
  "items": *[_type == "category" && defined(slug.current)] | order(title asc, _id asc)[$start...$end]{
    ${categoryFields}
  },
  "total": count(*[_type == "category" && defined(slug.current)])
}`);

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0]{${categoryFields}}
`);
