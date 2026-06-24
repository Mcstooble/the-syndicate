import { describe, it, expect } from "vitest";
import { bloomOpacity } from "./bloom";
describe("bloomOpacity", () => {
  it("is 0 before the trigger point", () => expect(bloomOpacity(0, 0.6, 1)).toBe(0));
  it("ramps to max at full progress", () => expect(bloomOpacity(1, 0.6, 0.5)).toBeCloseTo(0.5));
  it("is clamped to [0,max]", () => expect(bloomOpacity(2, 0.6, 0.5)).toBe(0.5));
});
