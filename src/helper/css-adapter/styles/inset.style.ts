import { AnimationProperties } from "@/types/animate.type"
import { MotionStyle } from "framer-motion"
import getDirections from "../utils/getDirections.utils"
import getDirectionsValues from "../utils/getDirectionsValues.utils"
import { isString } from "my-utilities"

const inset = <T extends AnimationProperties | MotionStyle | (AnimationProperties & MotionStyle)>(style: T) => {

    const insetValue = style["inset"]
    
    if (!insetValue) return {}

    const isInsetString = isString(insetValue)

    return getDirections((direction, index) => {

        const directionLowerCase = direction.toLowerCase() as keyof typeof style

        const directionStyle = style[directionLowerCase]

        const finalValue = isInsetString && !directionStyle ? getDirectionsValues(insetValue, index) : insetValue

        if (!finalValue && finalValue !== 0) return

        return {
            [directionLowerCase]: finalValue
        }
    })

}

export default inset