import { describe, it, expect } from "vitest";
import { glideTime } from "./glide";
describe("glideTime", () => {
  it("maps 0 progress to 0s", () => expect(glideTime(0, 24)).toBe(0));
  it("maps full progress to the clip duration", () => expect(glideTime(1, 24)).toBe(24));
  it("maps mid progress proportionally", () => expect(glideTime(0.25, 24)).toBe(6));
  it("clamps out-of-range progress", () => expect(glideTime(1.5, 24)).toBe(24));
});
