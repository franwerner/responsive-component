import { MotionStyle } from "framer-motion";
import getDirections from "../utils/getDirections.utils";
import { AnimationProperties } from "@/types/animate.type";
import { isString } from "my-utilities";
import getDirectionsValues from "../utils/getDirectionsValues.utils";

const padding = <T extends AnimationProperties | MotionStyle | (AnimationProperties & MotionStyle)>(style: T) => {

    const paddingValue = style["padding"]
    if (!paddingValue) return {}
    const isPaddingString = isString(paddingValue)
    return getDirections((direction, index) => {

        const paddingDirection = `padding${direction}` as const

        const paddingDirectionStyle = style[paddingDirection]

        const finalValue = isPaddingString && !paddingDirectionStyle ? getDirectionsValues(paddingValue, index) : paddingValue

        if (!finalValue && finalValue !== 0) return

        return {
            [paddingDirection]: finalValue
        }
    })

}

export default padding