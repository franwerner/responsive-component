import { AnimateProperties } from "@/types/animate.type";
import { MotionStyle } from "framer-motion";
import { isNumber, isString } from "my-utilities";
import getDirectionsValues from "../utils/getDirectionsValues.utils";

const transformNumberToPixel = (input: unknown): string | string[] | undefined => {
    if (isNumber(input)) {
        return `${input}px`
    } else if (Array.isArray(input)) {
        return input.map(transformNumberToPixel).filter(isString)
    } else if (isString(input)) return input
}

const borderRadius = <T extends AnimateProperties | MotionStyle | (AnimateProperties & MotionStyle)>(style: T) => {

    const borderRadiusValue = style?.["borderRadius"]

    const isBorderRadiusString = isString(borderRadiusValue)

    const directions = ["TopLeft", "TopRight", "BottomRight", "BottomLeft"] as const;

    return directions.reduce((acc, current, index) => {

        const borderRadiusDirection = `border${current}Radius` as const

        const borderRadiusDirectionStyle = style?.[borderRadiusDirection]

        const getDirectionsValue = isBorderRadiusString && !borderRadiusDirectionStyle && getDirectionsValues(borderRadiusValue, index)

        if ((!borderRadiusDirectionStyle && !borderRadiusValue) || (isBorderRadiusString && !getDirectionsValue && !borderRadiusDirectionStyle)) return acc

        return {
            ...acc,
            [borderRadiusDirection]: transformNumberToPixel(borderRadiusDirectionStyle) || getDirectionsValue || transformNumberToPixel(borderRadiusValue)

        }
    }, {})

};

export default borderRadius