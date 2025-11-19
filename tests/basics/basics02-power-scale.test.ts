import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { generateLightBurnSvg, LightBurnBaseElement } from "../../index"

describe("PowerScale Test (.lbrn v1) - power/speed grid", () => {
  test("parse and generate SVG snapshot", async () => {
    const xml = readFileSync(
      "tests/assets/PowerScale_Test_01_Rico.lbrn",
      "utf-8",
    )
    const project = LightBurnBaseElement.parse(xml)
    const svg = generateLightBurnSvg(project)

    expect(svg).toContain("<svg")
    await expect(svg).toMatchSvgSnapshot(import.meta.path)
  })
})
