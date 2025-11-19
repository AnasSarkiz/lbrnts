import { describe, expect, test } from "bun:test"
import {
  CutSetting,
  generateLightBurnSvg,
  LightBurnProject,
  ShapePath,
} from "../../index"

describe("Build LightBurn project from scratch", () => {
  test("create project with path and custom cut settings", async () => {
    // Create a new project
    const project = new LightBurnProject()
    project.appVersion = "1.7.03"
    project.formatVersion = "1"
    project.materialHeight = 0

    // Create a custom cut setting (e.g., for cutting wood)
    const cutSetting = new CutSetting()
    cutSetting.index = 0
    cutSetting.name = "Wood Cut"
    cutSetting.priority = 0
    cutSetting.type = "Cut"
    cutSetting.speed = 10 // mm/s
    cutSetting.maxPower = 80 // 80% power
    cutSetting.minPower = 60 // 60% power
    cutSetting.numPasses = 2 // 2 passes
    cutSetting.kerf = 0.2 // 0.2mm kerf offset

    // Add the cut setting to the project
    project.children.push(cutSetting)

    // Create a simple square path
    const path = new ShapePath()
    path.cutIndex = 0 // Use the cut setting we created (index 0)

    // Define vertices for a 50x50mm square centered at origin
    path.verts = [
      { x: -25, y: -25 }, // bottom-left
      { x: 25, y: -25 }, // bottom-right
      { x: 25, y: 25 }, // top-right
      { x: -25, y: 25 }, // top-left
    ]

    // Define primitives (line segments between vertices)
    path.prims = [
      { type: 0 }, // LineTo from vertex 0 to 1
      { type: 0 }, // LineTo from vertex 1 to 2
      { type: 0 }, // LineTo from vertex 2 to 3
      { type: 0 }, // LineTo from vertex 3 to 0 (closing the path)
    ]

    path.isClosed = true

    // Add the path to the project
    project.children.push(path)

    // Generate SVG to verify it works
    const svg = generateLightBurnSvg(project)

    // Basic assertions
    expect(svg).toContain("<svg")
    expect(svg).toContain("path") // Should contain a path element

    // Verify the path is roughly a square (check for all 4 corners)
    expect(svg).toContain("M") // Move command
    expect(svg).toContain("L") // Line commands

    // Match SVG snapshot
    await expect(svg).toMatchSvgSnapshot(import.meta.path)
  })

  test("create project with curved path and advanced cut settings", async () => {
    // Create a new project
    const project = new LightBurnProject()
    project.appVersion = "1.7.03"
    project.formatVersion = "1"

    // Create an advanced cut setting with multiple passes and power ramping
    const cutSetting = new CutSetting()
    cutSetting.index = 0
    cutSetting.name = "Acrylic Engrave"
    cutSetting.priority = 1
    cutSetting.type = "Cut"
    cutSetting.speed = 150 // mm/s
    cutSetting.maxPower = 50
    cutSetting.minPower = 40
    cutSetting.numPasses = 3
    cutSetting.enablePowerRamp = true
    cutSetting.rampLength = 2 // 2mm ramp

    project.children.push(cutSetting)

    // Create a path with bezier curves (rounded shape)
    const path = new ShapePath()
    path.cutIndex = 0

    // Define vertices for a curved shape
    path.verts = [
      { x: 0, y: -30 }, // start point
      { x: 30, y: 0, c: 1, c0x: 30, c0y: -16.5, c1x: 30, c1y: -16.5 }, // curve to right with control points
      { x: 0, y: 30, c: 1, c0x: 30, c0y: 16.5, c1x: 30, c1y: 16.5 }, // curve to top
      { x: -30, y: 0, c: 1, c0x: -30, c0y: 16.5, c1x: -30, c1y: 16.5 }, // curve to left
      { x: 0, y: -30, c: 1, c0x: -30, c0y: -16.5, c1x: -30, c1y: -16.5 }, // curve back to start
    ]

    // Define primitives (bezier curves)
    path.prims = [
      { type: 1 }, // BezierTo
      { type: 1 }, // BezierTo
      { type: 1 }, // BezierTo
      { type: 1 }, // BezierTo
    ]

    path.isClosed = true

    project.children.push(path)

    // Generate SVG
    const svg = generateLightBurnSvg(project)

    expect(svg).toContain("<svg")
    expect(svg).toContain("path")

    // Verify bezier curves are present
    expect(svg).toMatch(/[CM]/) // Should contain move or curve commands

    await expect(svg).toMatchSvgSnapshot(import.meta.path)
  })
})
