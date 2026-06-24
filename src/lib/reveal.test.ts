import { describe, it, expect } from "vitest";
import { shouldReveal } from "./reveal";

describe("shouldReveal", () => {
  it("reveals when the element is intersecting", () => {
    expect(shouldReveal({ isIntersecting: true })).toBe(true);
  });
  it("does not reveal when the element is not intersecting", () => {
    expect(shouldReveal({ isIntersecting: false })).toBe(false);
  });
});
