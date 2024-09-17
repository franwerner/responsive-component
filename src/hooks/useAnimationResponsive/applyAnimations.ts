import { MotionStyle } from "framer-motion"
import { AnimateProps } from "@responsive-component/types"
import { cssAdapter } from "@responsive-component/adapter/css/css.adapter"
import resetAnimate from "@responsive-component/utils/resetAnimate.utils"
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