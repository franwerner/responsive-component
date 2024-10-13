import { AnimationProperties } from "@/types/animate.type"
import iterateOverSides from "../utils/iterateOverSides.utils"
import extractBoxValues from "../utils/extractBoxValues.utils"
import { isString } from "my-utilities"
import isFalsyButNotZero from "../utils/isFalsyButNotZero.utilts"

const inset = <T extends AnimationProperties>(style: T) => {

    const insetValue = style["inset"]
    
    if (isFalsyButNotZero(insetValue)) return {}

    const isInsetString = isString(insetValue)

    return iterateOverSides((direction, index) => {

        const directionLowerCase = direction.toLowerCase() as keyof typeof style

        const directionStyle = style[directionLowerCase]

        const finalValue = isInsetString && !directionStyle ? extractBoxValues(insetValue, index) : insetValue

        if (isFalsyButNotZero(finalValue)) return

        return {
            [directionLowerCase]: finalValue
        }
    })

}

export default inset