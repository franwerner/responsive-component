import { isString } from "my-utilities"
import { AnimationProperties } from "@/types/animate.type"
import iterateOverSides from "../utils/iterateOverSides.utils"
import extractBoxValues from "../utils/extractBoxValues.utils"

const searchColor = (input: unknown) => {
    if (!isString(input)) return
    const res = input.match(/#\S+|rgb\S+/g)
    return Array.isArray(res) && res[0]
}
const searchStyle = (input: unknown) => {
    if (isString(input)) {
        const res = input.match(/(?<!#)\b[a-zA-Z]+\b(?![^\s])/g)
        return Array.isArray(res) && res[0]
    }
}

const borderTypes = ["Color", "Style"] as const

const border = <T extends AnimationProperties>(style: T) => {

    const borderGlobal = style["border"]
    const borderColorGlobal = style["borderColor"]
    const borderStyleGlobal = style["borderStyle"]

    return iterateOverSides((direction, index) => {
        const borderDirection = `border${direction}` as const
        const borderDirectionStyle = style[borderDirection]
        if (!borderDirectionStyle && !borderGlobal) return

        return borderTypes.reduce((acc, current) => {
            const borderTypeDirection = `${borderDirection}${current}` as const
            const borderTypeDirectionStyle = style[borderTypeDirection]

            const searchType = current === "Style" ? searchStyle : searchColor
            const globalType = current === "Style" ? borderStyleGlobal : borderColorGlobal

            const finalValue =
                borderTypeDirectionStyle
                || searchType(borderDirectionStyle)
                || (isString(globalType) ? extractBoxValues(globalType, index) : globalType)
                || searchType(borderGlobal)

            if (!finalValue) return acc

            return {
                ...acc,
                [borderTypeDirection]: finalValue
            }
        }, { [borderDirection]: borderDirectionStyle || borderGlobal, })

    })
}



export default border
