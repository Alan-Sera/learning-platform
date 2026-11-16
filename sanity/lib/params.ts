export interface Pagination { offset?: number; limit?: number }
export const MAX_PAGE_SIZE = 100;

export function paginationParams({ offset = 0, limit = 24 }: Pagination = {}) {
  if (!Number.isSafeInteger(offset) || offset < 0 ||
      !Number.isSafeInteger(limit) || limit < 1 || limit > MAX_PAGE_SIZE ||
      !Number.isSafeInteger(offset + limit)) {
    throw new RangeError("Use a non-negative integer offset and a limit between 1 and 100.");
  }
  return { start: offset, end: offset + limit };
}

export function validateSlug(slug: string) {
  if (typeof slug !== "string" || slug.length > 96 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new TypeError("Invalid content slug.");
  }
  return slug;
}
