import { expect, test } from "bun:test"
import { readFileSync } from "fs"
import { LightBurnBaseElement } from "../../lib/classes/LightBurnBaseElement"
import { generateLightBurnSvg } from "../../lib/svg-gen"

test("Path fill with proper clipping - pattern fill inside path boundary", async () => {
  const xml = readFileSync("tests/fixtures/path-fill-test.lbrn2", "utf-8")
  const project = LightBurnBaseElement.parse(xml)
  const svg = generateLightBurnSvg(project)

  expect(svg).toContain("<svg")

  // Should have pattern-based fill instead of individual scan lines
  expect(svg).toContain("<pattern")
  expect(svg).toContain("<defs>")
  expect(svg).toContain('stroke-opacity="0.8"')

  // The path element should have a pattern fill - the path shape naturally clips the pattern
  expect(svg).toContain('fill="url(#hatch-')
  expect(svg).toContain('fill-rule="nonzero"')

  await expect(svg).toMatchSvgSnapshot(import.meta.path)
})
