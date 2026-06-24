/** progress 0..1 down the page; bloom starts at `start`, eases to `max`. */
export function bloomOpacity(progress: number, start: number, max: number): number {
  if (progress <= start) return 0;
  const t = Math.min(1, (progress - start) / (1 - start));
  return Math.min(max, t * max);
}
