export type SectionPos = { id: string; top: number };
/** The active section is the last one whose top is at or above the scroll marker. */
export function resolveActive(sections: SectionPos[], scrollY: number): string {
  let active = sections[0]?.id ?? "";
  for (const s of sections) { if (scrollY >= s.top) active = s.id; }
  return active;
}
