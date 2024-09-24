import { isString } from "my-utilities"
import { AnimateProperties } from "@/types/animate.type"
import { MotionStyle } from "framer-motion"
import getDirections from "../utils/getDirections.utils"
import getDirectionsValues from "../utils/getDirectionsValues.utils"

const searchColor = (input: any) => {
    if (!isString(input)) return
    const res = input.match(/#\S+|rgb\S+/g)
    return Array.isArray(res) && res[0]
}
const searchStyle = (input: any) => {
    if (isString(input)) {
        const res = input.match(/(?<!#)\b[a-zA-Z]+\b(?![^\s])/g)
        return Array.isArray(res) && res[0]
    }
}

const border = <T extends AnimateProperties | MotionStyle | (AnimateProperties & MotionStyle)>(css: T) => {

    const borderGlobal = css["border"]
    const borderColorGlobal = css["borderColor"]
    const borderStyleGlobal = css["borderStyle"]

    return getDirections((direction, index) => {

        const borderDirection = `border${direction}` as const
        if (!css[borderDirection] && !borderGlobal) return

        const borderColorDirection = `${borderDirection}Color` as const
        const borderStyleDirection = `${borderDirection}Style` as const

        return {
            [borderDirection]: css[borderDirection] || borderGlobal,
            [borderColorDirection]: css[borderColorDirection] || searchColor(css[borderDirection]) || (isString(borderColorGlobal) ? getDirectionsValues(borderColorGlobal, index) : borderColorGlobal) || searchColor(borderGlobal) || "#FFF",
            [borderStyleDirection]: css[borderStyleDirection] || searchStyle(css[borderDirection]) || (isString(borderStyleGlobal) ? getDirectionsValues(borderStyleGlobal, index) : borderStyleGlobal) || searchStyle(borderGlobal) || "solid"
        }
    }) //Se le aplica el valor que mas especifico sea.
}

export default border
