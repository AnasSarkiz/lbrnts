/**
 * Type representing the JSON structure returned by xml2js
 */
export type XmlJson = {
  [key: string]: XmlJsonValue
}

export type XmlJsonValue =
  | string
  | number
  | boolean
  | null
  | XmlJsonElement
  | XmlJsonValue[]

export type XmlJsonElement = {
  $?: Record<string, string | number | boolean> // attributes
  _?: string // text content
  [key: string]:
    | XmlJsonValue
    | Record<string, string | number | boolean>
    | string
    | undefined
}
