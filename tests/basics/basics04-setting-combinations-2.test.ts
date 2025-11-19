import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { generateLightBurnSvg, LightBurnBaseElement } from "../../index"

describe("Example2 (.lbrn v1) - setting combinations", () => {
  test("parse and generate SVG snapshot", async () => {
    const xml = readFileSync("tests/assets/example2.lbrn", "utf-8")
    const project = LightBurnBaseElement.parse(xml)
    const svg = generateLightBurnSvg(project)

    expect(svg).toContain("<svg")
    await expect(svg).toMatchSvgSnapshot(import.meta.path)
  })
})
