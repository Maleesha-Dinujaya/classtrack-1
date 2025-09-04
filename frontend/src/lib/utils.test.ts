import { expect, test } from "bun:test";
import { cn } from "./utils";

test("merges class names", () => {
  expect(cn("foo", "bar")).toBe("foo bar");
});

test("handles conditional classes", () => {
  expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
});

test("merges tailwind classes using precedence", () => {
  expect(cn("p-2", "p-4")).toBe("p-4");
});
