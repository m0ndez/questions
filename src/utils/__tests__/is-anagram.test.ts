import { describe, it, expect } from "vitest";
import { isAnagram } from "../is-anagram";

describe("isAnagram", () => {
  it("should return true for valid anagrams", () => {
    expect(isAnagram("listen", "silent")).toBe(true);
    expect(isAnagram("Debit card", "Bad credit")).toBe(true);
    expect(isAnagram("evil", "vile")).toBe(true);
    expect(isAnagram("a gentleman", "elegant man")).toBe(true);
  });

  it("should return false for non-anagrams", () => {
    expect(isAnagram("hello", "world")).toBe(false);
    expect(isAnagram("test", "best")).toBe(false);
  });

  it("should handle case insensitivity", () => {
    expect(isAnagram("Listen", "Silent")).toBe(true);
    expect(isAnagram("EVIL", "vile")).toBe(true);
  });

  it("should handle strings with spaces", () => {
    expect(isAnagram("conversation", "voices rant on")).toBe(true);
    expect(isAnagram("a gentleman", "elegant man")).toBe(true);
  });

  it("should return false for strings of different lengths", () => {
    expect(isAnagram("hello", "helloworld")).toBe(false);
    expect(isAnagram("abc", "ab")).toBe(false);
  });

  it("should handle empty strings", () => {
    expect(isAnagram("", "")).toBe(true);
    expect(isAnagram("a", "")).toBe(false);
  });

  it("should handle single characters", () => {
    expect(isAnagram("a", "a")).toBe(true);
    expect(isAnagram("a", "b")).toBe(false);
  });

  it("should handle strings with only spaces", () => {
    expect(isAnagram("   ", "  ")).toBe(true);
  });
});
