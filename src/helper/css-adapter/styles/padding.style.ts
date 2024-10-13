import iterateOverSides from "../utils/iterateOverSides.utils";
import { AnimationProperties } from "@/types/animate.type";
import { isString } from "my-utilities";
import extractBoxValues from "../utils/extractBoxValues.utils";
import isFalsyButNotZero from "../utils/isFalsyButNotZero.utilts";

const padding = <T extends AnimationProperties>(style: T) => {

    const paddingValue = style["padding"]
    if (isFalsyButNotZero(paddingValue)) return {}
    const isPaddingString = isString(paddingValue)
    return iterateOverSides((direction, index) => {

        const paddingDirection = `padding${direction}` as const

        const paddingDirectionStyle = style[paddingDirection]

        const finalValue = isPaddingString && !paddingDirectionStyle ? extractBoxValues(paddingValue, index) : paddingValue

        if (isFalsyButNotZero(finalValue)) return

        return {
            [paddingDirection]: finalValue
        }
    })

}

export default padding