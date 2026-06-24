export function parallaxOffset(nx: number, ny: number, strength: number) {
  return { x: (nx - 0.5) * 2 * strength, y: (ny - 0.5) * 2 * strength };
}
