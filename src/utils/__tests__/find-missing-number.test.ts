import { describe, it, expect } from "vitest";
import { findMissingNumber } from "../find-missing-number";

describe("findMissingNumber", () => {
  it("should find missing number in the middle", () => {
    expect(findMissingNumber([1, 2, 4, 5])).toBe(3);
  });

  it("should find missing number at the start", () => {
    expect(findMissingNumber([2, 3, 4, 5])).toBe(1);
  });

  it("should find missing number at the end", () => {
    expect(findMissingNumber([1, 2, 3, 4])).toBe(5);
  });

  it("should handle array with single element", () => {
    expect(findMissingNumber([2])).toBe(1);
    expect(findMissingNumber([1])).toBe(2);
  });

  it("should handle array with two elements", () => {
    expect(findMissingNumber([1, 3])).toBe(2);
  });

  it("should handle larger sequences", () => {
    expect(findMissingNumber([1, 2, 3, 4, 5, 6, 7, 9, 10])).toBe(8);
  });

  it("should handle unordered array", () => {
    expect(findMissingNumber([5, 3, 1, 4])).toBe(2);
  });
});
