import { cssAdapter } from "@/helper/css-adapter/css-adapter.helper.js";
import { AnimateProperties } from "@/types/animate.type";
import { HTMLResponsiveComponent } from "@/types/responsive.type";
import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";
import { useMemo, useRef } from "react";
import { ReturnTypeResponsiveLayer } from "./UseResponsive.layer";
import resetAnimate, { onlyResetteableProperties } from "@/helper/resetAnimate.helper";

type ReturnTypeAnimationLayer<T extends HTMLResponsiveComponent, U extends AdaptedBreakpoints<U>> = Omit<ReturnTypeResponsiveLayer<T, U>, "currentBreakPoints">

function useAnimationLayer<T extends HTMLResponsiveComponent, U extends AdaptedBreakpoints<U>>(props: ReturnTypeResponsiveLayer<T, U>): ReturnTypeAnimationLayer<T, U>

function useAnimationLayer<T extends HTMLResponsiveComponent, U extends AdaptedBreakpoints<U>>({ currentBreakPoints, ...props }: ReturnTypeResponsiveLayer<T, U>) {

    const {
        style,
        animate,
        initial,
        whileHover,
        whileFocus,
        whileDrag,
        whileInView,
        whileTap,
    } = props;

    const adapters = {
        whileHover: cssAdapter(whileHover),
        whileDrag: cssAdapter(whileDrag),
        whileTap: cssAdapter(whileTap),
        style: cssAdapter(style),
        initial: cssAdapter(initial),
        animate: cssAdapter(animate),
        whileFocus: cssAdapter(whileFocus),
        whileInView: cssAdapter(whileInView),
    }

    const reseteableProperties = useRef<AnimateProperties>({})

    const setAllProperties = () => {
        /**
         * Necesitamos que todas las propiedades se apliquen un reseteo para que quede en referencia para cuando:
         * - Se utilize un evento y necesitamos un valor por defecto cuando de deje de accionar.
         * - Saber cuales propiedades se aplicaron el los breakpoints anteriores.
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
        const res = resetAnimate(Object.fromEntries(filterStyledProperties))
        return res
    }, [JSON.stringify(currentBreakPoints)])

    return {
        ...props,
        ...adapters,
        animate: { ...resetAnimations, ...adapters.animate },
    }

}


export type { ReturnTypeAnimationLayer };
export default useAnimationLayer
