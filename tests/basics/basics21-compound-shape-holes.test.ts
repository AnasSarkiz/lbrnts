import { expect, test } from "bun:test"
import {
  CutSetting,
  generateLightBurnSvg,
  LightBurnProject,
  ShapeGroup,
  ShapePath,
} from "../../index"

test("ShapeGroup with outer rect and inner hole renders with nonzero fill-rule", async () => {
  // Create a cut setting for engraving (Scan mode to show fill)
  const cutSetting = new CutSetting({
    index: 0,
    name: "Scan Test",
    priority: 0,
    type: "Scan",
    speed: 100,
    maxPower: 50,
    interval: 2, // Large interval so we can see individual lines in preview
  })

  // Create outer square path (clockwise winding)
  const outerSquare = new ShapePath({
    cutIndex: 0,
    verts: [
      { x: 0, y: 0 }, // bottom-left
      { x: 50, y: 0 }, // bottom-right
      { x: 50, y: 50 }, // top-right
      { x: 0, y: 50 }, // top-left
    ],
    prims: [
      { type: 0 }, // LineTo
      { type: 0 },
      { type: 0 },
      { type: 0 },
    ],
    isClosed: true,
  })

  // Create inner hole (counter-clockwise winding)
  const innerHole = new ShapePath({
    cutIndex: 0,
    verts: [
      { x: 15, y: 15 }, // bottom-left
      { x: 15, y: 35 }, // top-left (going counter-clockwise)
      { x: 35, y: 35 }, // top-right
      { x: 35, y: 15 }, // bottom-right
    ],
    prims: [{ type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }],
    isClosed: true,
  })

  // Create a ShapeGroup containing both shapes
  const group = new ShapeGroup()
  group.cutIndex = 0
  group.children = [outerSquare, innerHole]

  // Create the project
  const project = new LightBurnProject({
    appVersion: "1.7.03",
    formatVersion: "1",
    materialHeight: 0,
    children: [cutSetting, group],
  })

  // Generate SVG
  const svg = generateLightBurnSvg(project)

  // Verify the SVG contains the compound path with nonzero fill-rule
  expect(svg).toContain("fill-rule")
  expect(svg).toContain("nonzero")

  // Verify pattern-based fill is used instead of clipPath + scan lines
  expect(svg).toContain("<pattern")
  expect(svg).toContain("<defs>")
  expect(svg).toContain('fill="url(#hatch-')

  // Verify it's a compound path (both shapes combined into path elements)
  // We expect 2 path elements with d attribute: one for fill, one for outline stroke
  // Plus one path inside the pattern definition
  const pathMatches = svg.match(/<path[^>]+d="([^"]+)"/g) || []
  expect(pathMatches.length).toBe(3) // 1 in pattern + 2 for compound shape (fill + stroke)

  // The compound paths should have 2 "M" commands (one for outer, one for inner hole)
  // Filter to just the paths with 2 M commands (the compound shapes)
  const compoundPaths = pathMatches.filter((p) => {
    const mCount = (p.match(/M\s/g) || []).length
    return mCount === 2
  })
  expect(compoundPaths.length).toBe(2) // fill path and stroke path

  await expect(svg).toMatchSvgSnapshot(import.meta.path)
})
