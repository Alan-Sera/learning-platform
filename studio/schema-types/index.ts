import { course } from "./documents/course";
import { lesson } from "./documents/lesson";
import { instructor } from "./documents/instructor";
import { category } from "./documents/category";
import { moduleType } from "./objects/module";
import { contentImage } from "./objects/content-image";
import { blockContent } from "./objects/block-content";
import { learningOutcome } from "./objects/learning-outcome";
import { resource } from "./objects/resource";

export const schemaTypes = [
  course, lesson, instructor, category,
  moduleType, contentImage, blockContent, learningOutcome, resource,
];
