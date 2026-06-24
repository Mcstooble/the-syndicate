import { describe, it, expect } from "vitest";
import { resolveActive } from "./nav";

describe("resolveActive", () => {
  it("returns the id whose top is closest to (but above) the marker line", () => {
    const sections = [
      { id: "hero", top: 0 },
      { id: "services", top: 800 },
      { id: "experience", top: 1600 },
    ];
    expect(resolveActive(sections, 850)).toBe("services");
  });
  it("returns the first section when scrolled above all markers", () => {
    expect(resolveActive([{ id: "hero", top: 0 }, { id: "services", top: 800 }], -10)).toBe("hero");
  });
  it("returns the last section when scrolled past all", () => {
    expect(resolveActive([{ id: "hero", top: 0 }, { id: "services", top: 800 }], 5000)).toBe("services");
  });
});
