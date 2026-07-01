import { describe, it, expect } from "vitest"
import { formatCurrency } from "./currency"

describe("formatCurrency", () => {
  it("should format positive numbers correctly", () => {
    expect(formatCurrency(1000)).toBe("$1,000.00")
    expect(formatCurrency(0.99)).toBe("$0.99")
    expect(formatCurrency(1234567.89)).toBe("$1,234,567.89")
  })

  it("should handle zero", () => {
    expect(formatCurrency(0)).toBe("$0.00")
  })

  it("should handle negative numbers", () => {
    expect(formatCurrency(-100)).toBe("-$100.00")
  })
})
