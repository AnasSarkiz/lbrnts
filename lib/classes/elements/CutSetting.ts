import { LightBurnBaseElement } from "../LightBurnBaseElement"
import type { XmlJsonElement } from "../../xml-parsing/xml-parsing-types"
import { num, str, boolish } from "./_coerce"

export class CutSetting extends LightBurnBaseElement {
  private _type: string = "Cut"
  private _index?: number
  private _name?: string
  private _priority?: number
  private _minPower?: number
  private _maxPower?: number
  private _minPower2?: number
  private _maxPower2?: number
  private _speed?: number
  private _kerf?: number
  private _zOffset?: number
  private _enablePowerRamp?: boolean
  private _rampLength?: number
  private _numPasses?: number
  private _zPerPass?: number
  private _perforate?: boolean
  private _dotMode?: boolean
  private _scanOpt?: string
  private _interval?: number
  private _angle?: number
  private _overScanning?: number
  private _lineAngle?: number

  constructor() {
    super()
    this.token = "CutSetting"
  }

  get type(): string { return this._type }
  set type(value: string) { this._type = value }

  get index(): number | undefined { return this._index }
  set index(value: number | undefined) { this._index = value }

  get name(): string | undefined { return this._name }
  set name(value: string | undefined) { this._name = value }

  get priority(): number | undefined { return this._priority }
  set priority(value: number | undefined) { this._priority = value }

  get minPower(): number | undefined { return this._minPower }
  set minPower(value: number | undefined) { this._minPower = value }

  get maxPower(): number | undefined { return this._maxPower }
  set maxPower(value: number | undefined) { this._maxPower = value }

  get minPower2(): number | undefined { return this._minPower2 }
  set minPower2(value: number | undefined) { this._minPower2 = value }

  get maxPower2(): number | undefined { return this._maxPower2 }
  set maxPower2(value: number | undefined) { this._maxPower2 = value }

  get speed(): number | undefined { return this._speed }
  set speed(value: number | undefined) { this._speed = value }

  get kerf(): number | undefined { return this._kerf }
  set kerf(value: number | undefined) { this._kerf = value }

  get zOffset(): number | undefined { return this._zOffset }
  set zOffset(value: number | undefined) { this._zOffset = value }

  get enablePowerRamp(): boolean | undefined { return this._enablePowerRamp }
  set enablePowerRamp(value: boolean | undefined) { this._enablePowerRamp = value }

  get rampLength(): number | undefined { return this._rampLength }
  set rampLength(value: number | undefined) { this._rampLength = value }

  get numPasses(): number | undefined { return this._numPasses }
  set numPasses(value: number | undefined) { this._numPasses = value }

  get zPerPass(): number | undefined { return this._zPerPass }
  set zPerPass(value: number | undefined) { this._zPerPass = value }

  get perforate(): boolean | undefined { return this._perforate }
  set perforate(value: boolean | undefined) { this._perforate = value }

  get dotMode(): boolean | undefined { return this._dotMode }
  set dotMode(value: boolean | undefined) { this._dotMode = value }

  get scanOpt(): string | undefined { return this._scanOpt }
  set scanOpt(value: string | undefined) { this._scanOpt = value }

  get interval(): number | undefined { return this._interval }
  set interval(value: number | undefined) { this._interval = value }

  get angle(): number | undefined { return this._angle }
  set angle(value: number | undefined) { this._angle = value }

  get overScanning(): number | undefined { return this._overScanning }
  set overScanning(value: number | undefined) { this._overScanning = value }

  get lineAngle(): number | undefined { return this._lineAngle }
  set lineAngle(value: number | undefined) { this._lineAngle = value }

  static override fromXmlJson(node: XmlJsonElement): CutSetting {
    const cs = new CutSetting()

    if (node.$) {
      cs.type = str(node.$.type, "Cut")
    }

    // Helper function to parse child element value
    const getChildValue = (key: string): any => {
      const child = (node as any)[key]
      return child?.$?.Value
    }

    // Parse all known child elements
    cs.index = num(getChildValue("index"), undefined)
    cs.name = str(getChildValue("name"), undefined)
    cs.priority = num(getChildValue("priority"), undefined)
    cs.minPower = num(getChildValue("minPower"), undefined)
    cs.maxPower = num(getChildValue("maxPower"), undefined)
    cs.minPower2 = num(getChildValue("minPower2"), undefined)
    cs.maxPower2 = num(getChildValue("maxPower2"), undefined)
    cs.speed = num(getChildValue("speed"), undefined)
    cs.kerf = num(getChildValue("kerf"), undefined)
    cs.zOffset = num(getChildValue("zOffset"), undefined)
    cs.enablePowerRamp = boolish(getChildValue("enablePowerRamp"), undefined)
    cs.rampLength = num(getChildValue("rampLength"), undefined)
    cs.numPasses = num(getChildValue("numPasses"), undefined)
    cs.zPerPass = num(getChildValue("zPerPass"), undefined)
    cs.perforate = boolish(getChildValue("perforate"), undefined)
    cs.dotMode = boolish(getChildValue("dotMode"), undefined)
    cs.scanOpt = str(getChildValue("scanOpt"), undefined)
    cs.interval = num(getChildValue("interval"), undefined)
    cs.angle = num(getChildValue("angle"), undefined)
    cs.overScanning = num(getChildValue("overScanning"), undefined)
    cs.lineAngle = num(getChildValue("lineAngle"), undefined)

    return cs
  }
}

LightBurnBaseElement.register("CutSetting", CutSetting)
