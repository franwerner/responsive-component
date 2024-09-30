import { AnimationProperties } from "@/types/animate.type"
import iterateOverSides from "../utils/iterateOverSides.utils"
import { MotionStyle } from "framer-motion"
import extractBoxValues from "../utils/extractBoxValues.utils"
import { isString } from "my-utilities"
import isFalsyButNotZero from "../utils/isFalsyButNotZero.utilts"

const margin = <T extends AnimationProperties | MotionStyle | (AnimationProperties & MotionStyle)>(style: T) => {

    const marginValue = style["margin"]

    if (isFalsyButNotZero(marginValue)) return {}

    const isMarginString = isString(marginValue)

    return iterateOverSides((direction, index) => {

        const marginDirection = `margin${direction}` as const

        const marginDirectionStyle = style[marginDirection]

        const finalValue = isMarginString && !marginDirectionStyle ? extractBoxValues(marginValue, index) : marginValue

        if (isFalsyButNotZero(finalValue)) return

        return {
            [marginDirection]: finalValue
        }
    })

}

export default margin


