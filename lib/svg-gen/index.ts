import { stringify } from "svgson"
import type { LightBurnBaseElement } from "../classes/LightBurnBaseElement"
import { assembleSvg } from "./assemble"
import { collectShapes } from "./collect"
import { collectCutSettings } from "./collect-cut-settings"
import { HatchPatternRegistry } from "./fill-patterns"
import { computeLayout } from "./layout"
import { DEFAULT_OPTIONS, type GenerateSvgOptions } from "./options"
import { measure, renderAll } from "./registry"

export type { GenerateSvgOptions } from "./options"

export function generateLightBurnSvg(
  root: LightBurnBaseElement | LightBurnBaseElement[],
  options?: GenerateSvgOptions,
): string {
  const shapes = collectShapes(root)
  const cutSettings = collectCutSettings(root)
  const bbox = measure(shapes)
  const layout = computeLayout(bbox, options)

  // Create pattern registry for hatch fill patterns
  const patternRegistry = new HatchPatternRegistry()

  // Build render options with pattern registry
  const renderOptions = {
    strokeWidth:
      options?.defaultStrokeWidth ?? DEFAULT_OPTIONS.defaultStrokeWidth,
    patternRegistry,
  }

  const nodes = renderAll(shapes, cutSettings, renderOptions)

  // Collect pattern definitions for <defs> section
  const defs = patternRegistry.getPatterns()

  const svgTree = assembleSvg(nodes, layout, defs)
  return stringify(svgTree)
}
