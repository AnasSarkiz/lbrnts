# lbrnts

A type-safe library for parsing and writing [LightBurn](https://lightburnsoftware.com/) files.

## Usage

```tsx
import { LightBurnProject } from "lbrnts"

const project = LightBurnProject.parse(fs.readFileSync("project.lbrn2", "utf8"))

console.log(project.shapes)
```

You can also create a project from scratch:

```tsx
import { LightBurnProject } from "lbrnts"

const project = new LightBurnProject()

project.shapes.push(
  new LightBurnShape.Rect({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  })
)
```
