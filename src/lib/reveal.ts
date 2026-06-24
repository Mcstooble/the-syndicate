/**
 * Pure helper for the scroll-reveal observer. Given an IntersectionObserver
 * entry-like shape, decide whether the element should be revealed now.
 * Reveal once intersecting; never un-reveal (one-shot).
 */
export interface RevealTarget {
  isIntersecting: boolean;
}

export function shouldReveal(entry: RevealTarget): boolean {
  return entry.isIntersecting === true;
}
