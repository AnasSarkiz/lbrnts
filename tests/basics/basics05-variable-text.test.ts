import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { generateLightBurnSvg, LightBurnBaseElement } from "../../index"

describe("ZippoLighter (.lbrn2 v2) - Variable Text + transforms", () => {
  test("parse and generate SVG snapshot", async () => {
    const xml = readFileSync("tests/assets/ZippoLighter.lbrn2", "utf-8")
    const project = LightBurnBaseElement.parse(xml)
    const svg = generateLightBurnSvg(project)

    expect(svg).toContain("<svg")
    await expect(svg).toMatchSvgSnapshot(import.meta.path)
  })
})
