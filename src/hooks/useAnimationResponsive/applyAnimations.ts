import { MotionStyle } from "framer-motion"
import { MotionAnimate } from "../.."
import { cssAdapter } from "../../adapter/css/css.adapter"
import resetAnimate from "../../utils/resetAnimate.utils"
import { IRefAnimationControls } from "./useAnimateResponsive.hook"

interface IApplyAnimations {
    current: IRefAnimationControls["current"],
    animate: MotionAnimate | false,
    style: MotionStyle
}

const applyAnimations = ({ animate, current, style }: IApplyAnimations) => {

    const newAnimate = cssAdapter(animate ? {...style,...animate} : cssAdapter(style)) as MotionAnimate

    const reset = resetAnimate(current.cache)

    current.cache = { ...current.cache, ...newAnimate }

    return { ...reset, ...newAnimate }
}


export default applyAnimations