import { parseString } from "xml2js"
import type { XmlJson } from "./xml-parsing-types"

export const parseXml = (xml: string): XmlJson => {
  let err: Error | null = null
  let result: XmlJson | null = null

  parseString(xml, (err_, result_) => {
    err = err_
    result = result_
  })

  if (err) {
    throw err
  }

  if (!result) {
    throw new Error("Failed to parse XML")
  }

  return result
}
