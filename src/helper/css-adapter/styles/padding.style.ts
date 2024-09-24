import { MotionStyle } from "framer-motion";
import getDirections from "../utils/getDirections.utils";
import { AnimateProperties } from "@/types/animate.type";
import { isString } from "my-utilities";
import getDirectionsValues from "../utils/getDirectionsValues.utils";

const padding = <T extends AnimateProperties | MotionStyle | (AnimateProperties & MotionStyle)>(style: T) => {

    const paddingValue = style["padding"]
    if (!paddingValue) return {}

    const isPaddingString = isString(paddingValue)
    return getDirections((direction, index) => {
        const paddingDirection = `padding${direction}` as const
        const directionValue = isPaddingString && getDirectionsValues(paddingValue, index)

        if (!directionValue && isPaddingString) return

        return {
            [paddingDirection]: directionValue || paddingValue
        }
    })

}

export default padding