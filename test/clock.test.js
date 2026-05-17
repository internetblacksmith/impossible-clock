import { describe, it, expect } from "vitest";
import {
  HIDDEN_DIGIT,
  digit,
  status,
  statusClass,
  zeroPad,
} from "../app/scripts/clock.js";

describe("zeroPad", () => {
  it("pads single digits with a leading zero", () => {
    expect(zeroPad(0)).toBe("00");
    expect(zeroPad(5)).toBe("05");
    expect(zeroPad(9)).toBe("09");
  });

  it("leaves two-digit values untouched", () => {
    expect(zeroPad(10)).toBe("10");
    expect(zeroPad(59)).toBe("59");
  });
});

describe("digit", () => {
  // Fixed date: Wednesday 2024-06-12 09:05:07 local time.
  const fixed = new Date(2024, 5, 12, 9, 5, 7);
  const hours = d => d.getHours();
  const minutes = d => d.getMinutes();
  const seconds = d => d.getSeconds();

  it("returns the requested digit position when enabled", () => {
    expect(digit(fixed, hours, 0, true)).toBe("0");
    expect(digit(fixed, hours, 1, true)).toBe("9");
    expect(digit(fixed, minutes, 0, true)).toBe("0");
    expect(digit(fixed, minutes, 1, true)).toBe("5");
    expect(digit(fixed, seconds, 0, true)).toBe("0");
    expect(digit(fixed, seconds, 1, true)).toBe("7");
  });

  it("returns HIDDEN_DIGIT when the component is disabled", () => {
    expect(digit(fixed, hours, 0, false)).toBe(HIDDEN_DIGIT);
    expect(digit(fixed, minutes, 1, false)).toBe(HIDDEN_DIGIT);
    expect(digit(fixed, seconds, 0, false)).toBe(HIDDEN_DIGIT);
  });

  it("HIDDEN_DIGIT is the literal '10' the seven-segment CSS expects", () => {
    // Pinning this so a future "let's use 99 instead" refactor breaks the
    // test instead of silently breaking the CSS.
    expect(HIDDEN_DIGIT).toBe("10");
  });
});

describe("status / statusClass", () => {
  it("status maps booleans to on/off", () => {
    expect(status(true)).toBe("on");
    expect(status(false)).toBe("off");
  });

  it("statusClass joins H/M/S with hyphens in order", () => {
    expect(statusClass(true, true, true)).toBe("on-on-on");
    expect(statusClass(false, false, false)).toBe("off-off-off");
    expect(statusClass(true, false, true)).toBe("on-off-on");
    expect(statusClass(false, true, false)).toBe("off-on-off");
  });
});
