import type { INode } from "svgson"

export interface AssembleInput {
  width: number
  height: number
  viewBox: string
  bg: { x: number; y: number; width: number; height: number }
  flipY: number
}

/**
 * Assemble the final SVG document from rendered shapes.
 *
 * @param children - The rendered shape nodes
 * @param layout - Layout parameters (dimensions, viewBox, background)
 * @param defs - Optional array of definition nodes (patterns, gradients, etc.)
 */
export function assembleSvg(
  children: INode[],
  layout: AssembleInput,
  defs?: INode[],
): INode {
  const svgChildren: INode[] = []

  // Add <defs> section if there are pattern/gradient definitions
  if (defs && defs.length > 0) {
    svgChildren.push({
      name: "defs",
      type: "element",
      value: "",
      attributes: {},
      children: defs,
    })
  }

  // Add background rect
  svgChildren.push({
    name: "rect",
    type: "element",
    value: "",
    attributes: {
      x: String(layout.bg.x),
      y: String(layout.bg.y),
      width: String(layout.bg.width),
      height: String(layout.bg.height),
      fill: "white",
    },
    children: [],
  })

  // Add content group with Y-flip transform
  svgChildren.push({
    name: "g",
    type: "element",
    value: "",
    attributes: {
      transform: `matrix(1 0 0 -1 0 ${layout.flipY})`,
    },
    children,
  })

  return {
    name: "svg",
    type: "element",
    value: "",
    attributes: {
      xmlns: "http://www.w3.org/2000/svg",
      width: String(layout.width),
      height: String(layout.height),
      viewBox: layout.viewBox,
      style: "background-color: white;",
    },
    children: svgChildren,
  }
}
