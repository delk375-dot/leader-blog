import { getCollection } from "astro:content";
import { getSortedPosts } from "./getSortedPosts";

/**
 * Centralized public post query.
 *
 * Returns only posts that should be visible at build/deploy time:
 * non-draft posts with `pubDatetime` less than or equal to now, sorted newest first.
 */
export async function getPublishedPosts() {
  const posts = await getCollection("posts");
  return getSortedPosts(posts);
}
