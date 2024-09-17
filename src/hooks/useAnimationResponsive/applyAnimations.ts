import { MotionStyle } from "framer-motion"
import { AnimateProps } from "@/types"
import { cssAdapter } from "@/adapter/css/css.adapter"
import resetAnimate from "@/utils/resetAnimate.utils"
import { IRefAnimationControls } from "./useAnimateResponsive.hook"

interface IApplyAnimations {
    current: IRefAnimationControls["current"],
    animate: AnimateProps | false,
    style: MotionStyle
}

const applyAnimations = ({ animate, current, style }: IApplyAnimations) => {

    const newAnimate = cssAdapter(animate ? {...style,...animate} : cssAdapter(style)) as AnimateProps

    const reset = resetAnimate(current.cache)

    current.cache = { ...current.cache, ...newAnimate }

    return { ...reset, ...newAnimate }
}


export default applyAnimations