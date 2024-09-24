import { AnimateProperties } from "@/types/animate.type"
import getDirections from "../utils/getDirections.utils"
import { MotionStyle } from "framer-motion"
import getDirectionsValues from "../utils/getDirectionsValues.utils"
import { isString } from "my-utilities"

const margin = <T extends AnimateProperties | MotionStyle | (AnimateProperties & MotionStyle)>(style: T) => {

    const marginValue = style["margin"]

    if (!marginValue) return {}

    const isMarginString = isString(marginValue)

    return getDirections((direction, index) => {
        const marginDirection = `margin${direction}` as const

        const directionValue = isMarginString && getDirectionsValues(marginValue, index)

        if (isMarginString && !directionValue) return 

        return {
            [marginDirection]: directionValue || marginValue
        }
    })

}

export default margin


