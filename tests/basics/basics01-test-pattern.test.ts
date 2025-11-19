import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { generateLightBurnSvg, LightBurnBaseElement } from "../../index"

describe("LightBurn Test Pattern (.lbrn v1)", () => {
  test("parse and generate SVG snapshot", async () => {
    const xml = readFileSync(
      "tests/assets/Lightburn_Test_Pattern.lbrn",
      "utf-8",
    )
    const project = LightBurnBaseElement.parse(xml)
    const svg = generateLightBurnSvg(project)

    expect(svg).toContain("<svg")
    await expect(svg).toMatchSvgSnapshot(import.meta.path)
  })
})
