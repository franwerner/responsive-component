import { AnimateProperties } from "@/types/animate.type"
import { MotionStyle } from "framer-motion"
import getDirections from "../utils/getDirections.utils"
import getDirectionsValues from "../utils/getDirectionsValues.utils"
import { isString } from "my-utilities"

const inset = <T extends AnimateProperties | MotionStyle | (AnimateProperties & MotionStyle)>(style: T) => {

    const insetValue = style["inset"]

    const isInsetString = isString(insetValue)

    if (!insetValue) return {}

    return getDirections((direction, index) => {

        const directionLowerCase = direction.toLowerCase() as keyof typeof style

        const directionStyle = style?.[directionLowerCase]

        if (directionStyle) return

        const directionValue = isInsetString && getDirectionsValues(insetValue, index)

        if (!directionValue && isInsetString) return

        return {
            [directionLowerCase]: directionValue || insetValue
        }
    })

}

export default inset