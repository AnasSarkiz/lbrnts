import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { generateLightBurnSvg, LightBurnBaseElement } from "../../index"

describe("LightBurn Front Panels (.lbrn2 v2) - front panel layouts", () => {
  test("parse and generate SVG snapshot", async () => {
    const xml = readFileSync(
      "tests/assets/lightburn_front_panels.lbrn2",
      "utf-8",
    )
    const project = LightBurnBaseElement.parse(xml)
    const svg = generateLightBurnSvg(project)

    expect(svg).toContain("<svg")
    await expect(svg).toMatchSvgSnapshot(import.meta.path)
  })
})
