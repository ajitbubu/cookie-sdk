import { describe, it, expect, afterEach } from "vitest";
import { isGpcActive } from "../src/gpc";

function setGpc(value: boolean | undefined) {
  Object.defineProperty(navigator, "globalPrivacyControl", {
    value,
    configurable: true,
  });
}

afterEach(() => setGpc(undefined));

describe("isGpcActive", () => {
  it("is true when navigator.globalPrivacyControl === true", () => {
    setGpc(true);
    expect(isGpcActive()).toBe(true);
  });
  it("is false when the signal is absent", () => {
    setGpc(undefined);
    expect(isGpcActive()).toBe(false);
  });
  it("is false when explicitly false", () => {
    setGpc(false);
    expect(isGpcActive()).toBe(false);
  });
});
