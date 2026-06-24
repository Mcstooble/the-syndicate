/** Map page-scroll progress (0..1) to a target video time in seconds. */
export function glideTime(progress: number, duration: number): number {
  return Math.max(0, Math.min(1, progress)) * duration;
}
