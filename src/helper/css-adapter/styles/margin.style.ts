import { AnimationProperties } from "@/types/animate.type"
import getDirections from "../utils/getDirections.utils"
import { MotionStyle } from "framer-motion"
import getDirectionsValues from "../utils/getDirectionsValues.utils"
import { isString } from "my-utilities"

const margin = <T extends AnimationProperties | MotionStyle | (AnimationProperties & MotionStyle)>(style: T) => {

    const marginValue = style["margin"]

    if (!marginValue) return {}

    const isMarginString = isString(marginValue)

    return getDirections((direction, index) => {

        const marginDirection = `margin${direction}` as const

        const marginDirectionStyle = style[marginDirection]

        const finalValue = isMarginString && !marginDirectionStyle ? getDirectionsValues(marginValue, index) : marginValue

        if (!finalValue && finalValue !== 0) return

        return {
            [marginDirection]: finalValue
        }
    })

}

export default margin


