import { AnimationPlaybackControls, MotionStyle, ValueAnimationTransition, useAnimate } from "framer-motion";
import { useRef } from "react";
import { AnimateProps } from "@/types/responsive-component.types";
import NewAnimationsControllers, { IReturnNewAnimationsControllers } from "./NewAnimationsControllers";
import applyAnimations from "./applyAnimations";

/**
 * @description
 * 1. Este hooks nos permite cuando y como activamos las animaciones responsivas.
 * 2. Sirve tanto para componentes motion,responsiveComponent y elemento nativos.
 * 3. Una vez activado, las animaciones se adaptaran responsivamente como se indicaron en el objecto.
 */

type ResponsiveAnimate<T> = {
    [K in keyof T]?: AnimateProps
}

interface IRefAnimationControls {
    current: {
        animationState: "play" | "complete" | "pause" | "restart" | "cancel" | "initial"
        cache: AnimateProps
    }
}
interface IScopeMod<T = any> {
    animations: AnimationPlaybackControls[]
    current: {
        localRef: T
        animate: AnimateProps
        style: MotionStyle
        transition: ValueAnimationTransition
    }
}

 const useAnimateResponsive = () => {

    const refAnimationControls: IRefAnimationControls = useRef({ animationState: "initial", cache: {} })
    const [s, controls] = useAnimate()

    const scope = s as IScopeMod

    const current = refAnimationControls.current

    const controlsHandler = () => {
        const value = ["cancel", "pause", "initial", "restart"].includes(current.animationState)
        const defaultValue = applyAnimations({ animate: !value && scope.current.animate, current, style: scope.current.style })
        const defaultTransition = value ? { duration: 0.2 } : scope.current.transition
        return controls(scope.current.localRef, defaultValue, defaultTransition)
    }

    const newControls = new NewAnimationsControllers({ controlsHandler, current }) as IReturnNewAnimationsControllers

    return [scope, newControls] as const
};

export type { IRefAnimationControls, IScopeMod, ResponsiveAnimate };
export default useAnimateResponsive
