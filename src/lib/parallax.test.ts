import { describe, it, expect } from "vitest";
import { parallaxOffset } from "./parallax";
describe("parallaxOffset", () => {
  it("is zero at the centre", () => expect(parallaxOffset(0.5, 0.5, 12)).toEqual({ x: 0, y: 0 }));
  it("pushes to max at the corners", () => expect(parallaxOffset(1, 1, 12)).toEqual({ x: 12, y: 12 }));
  it("inverts past centre", () => expect(parallaxOffset(0, 0, 12)).toEqual({ x: -12, y: -12 }));
});
