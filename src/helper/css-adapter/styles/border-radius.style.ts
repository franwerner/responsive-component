import { AnimationProperties } from "@/types/animate.type";
import { MotionStyle } from "framer-motion";
import { isNumber, isString } from "my-utilities";
import extractBoxValues from "../utils/extractBoxValues.utils";
import iterateOverSides from "../utils/iterateOverSides.utils";
import isFalsyButNotZero from "../utils/isFalsyButNotZero.utilts";

const transformNumberToPixel = (input: unknown): string | string[] | undefined => {
    if (isNumber(input)) {
        return `${input}px`
    } else if (Array.isArray(input)) {
        return input.map(transformNumberToPixel).filter(isString)
    } else if (isString(input)) return input
}

const borderRadius = <T extends AnimationProperties | MotionStyle | (AnimationProperties & MotionStyle)>(style: T) => {

    const borderRadiusValue = style?.["borderRadius"]

    const isBorderRadiusString = isString(borderRadiusValue)

    const directions = ["TopLeft", "TopRight", "BottomRight", "BottomLeft"] as const;

    return iterateOverSides((current, index) => {

        const borderRadiusDirection = `border${current}Radius` as const

        const borderRadiusDirectionStyle = style[borderRadiusDirection]

        const getDirectionsValue = isBorderRadiusString && !borderRadiusDirectionStyle ?
            extractBoxValues(borderRadiusValue, index) :
            (borderRadiusDirectionStyle ?? borderRadiusValue)

        if (isFalsyButNotZero(getDirectionsValue)) return

        return {
            [borderRadiusDirection]: transformNumberToPixel(getDirectionsValue)
        }
    }, directions)

};

export default borderRadius