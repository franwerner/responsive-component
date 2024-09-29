import { cssAdapter } from "@/helper/css-adapter/css-adapter.helper.js";
import resetAnimate, { onlyResetteableProperties } from "@/helper/resetAnimate.helper";
import { AnimationProperties, AnimationVariants,  } from "@/types/animate.type";
import { HTMLResponsiveComponent } from "@/types/responsive.type";
import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";
import { MotionStyle } from "framer-motion";
import { useMemo, useRef } from "react";
import { ReturnTypeResponsiveLayer } from "./UseResponsive.layer";
import resolveVariants from "@/helper/resolveVariants.helper";

const adapterKeys = (["whileHover", "whileDrag", "whileTap", "whileFocus", "whileInView", "style", "animate"] as const)

type ReturnTypeAnimationLayer<
    T extends HTMLResponsiveComponent,
    U extends AdaptedBreakpoints<U>,
    C = any,
    K extends AnimationVariants<any,C> = never
> = Omit<ReturnTypeResponsiveLayer<T, U, C, K>, "currentBreakPoints" | "variants" | "custom">

function useAnimationLayer<
    T extends HTMLResponsiveComponent,
    U extends AdaptedBreakpoints<U>,
    C = any,
    K extends AnimationVariants<any,C> = never
>(props: ReturnTypeResponsiveLayer<T, U, C, K>): ReturnTypeAnimationLayer<T, U, C, K>

function useAnimationLayer<
    T extends HTMLResponsiveComponent,
    U extends AdaptedBreakpoints<U>,
    C = any,
    K extends AnimationVariants<any,C> = never
>({ currentBreakPoints, variants, custom, ...props }: ReturnTypeResponsiveLayer<T, U, C, K>) {

    const reseteableProperties = useRef<AnimationProperties>({})

    const animableVariant = resolveVariants<C,AnimationVariants<any,C>>(variants, custom)

    const adapters = adapterKeys.reduce((acc, current) => {
        const res = current === "style" ? props[current] : animableVariant(props[current] )
        return {
            ...acc,
            [current]: cssAdapter(res)
        }
    }, {} as { [K in typeof adapterKeys[number]]: K extends "style" ? MotionStyle : AnimationProperties });

    const setAllProperties = () => {
        /**
         * Necesitamos que todas las propiedades se apliquen un reseteo para que quede en referencia para cuando:
         * - Se inicializa un evento de framer-motion y necesitamos un valor por defecto ya aplicado cuando de deje de accionar.
         * - Saber cuales propiedades se aplicaron el los breakpoints anteriores, para aplicar el resteo a las que no se utilicen.
         */
        const { whileDrag, whileFocus, whileHover, whileTap, animate, whileInView } = adapters
        for (const properties of [whileDrag, whileFocus, whileHover, whileTap, whileInView, animate]) {
            Object.assign(reseteableProperties.current, onlyResetteableProperties(properties))
        }
    }

    const resetAnimations = useMemo(() => {
        setAllProperties()
        const ref = reseteableProperties.current
        const filterStyledProperties = Object.entries(ref).filter(([key]) => !(key in adapters.style) && !(key in adapters.animate))
        return resetAnimate(Object.fromEntries(filterStyledProperties))
    }, [JSON.stringify(currentBreakPoints)])

    return {
        ...props,
        ...adapters,
        animate: { ...resetAnimations, ...adapters.animate },
    }

}


export type { ReturnTypeAnimationLayer };
export default useAnimationLayer
