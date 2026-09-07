import { describe, expect, it } from "vitest";
import { products } from "../client/src/pages/Store";

describe("Midnight Store launch catalog", () => {
  it("contains exactly the three approved launch products", () => {
    expect(products).toHaveLength(3);
    expect(products.map(product => product.slug)).toEqual([
      "compression-packing-cubes",
      "cable-control-kit",
      "self-cleaning-pet-brush",
    ]);
  });

  it("keeps launch products generic, compact, and priced for a test assortment", () => {
    for (const product of products) {
      expect(product.price).toBeGreaterThan(0);
      expect(product.score).toBeGreaterThanOrEqual(83);
      expect(product.highlights.length).toBeGreaterThanOrEqual(3);
      expect(product.specs.length).toBeGreaterThanOrEqual(3);
      expect(product.description).not.toMatch(/medical|guaranteed|waterproof/i);
    }
  });
});
