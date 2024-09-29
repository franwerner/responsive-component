import joinResponsiveProperties from "@/helper/joinResponsiveProperties.helper";
import useBreakPoints from "@/hooks/useBreakPoints.hook.js";
import { HTMLResponsiveComponent, ResponsiveProperties } from "@/types/responsive.type";
import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";
import { isFunction, isObject } from "my-utilities";
import { useEffect } from "react";
import { ReturnTypeVariantsLayer } from "./useVariants.layer";

type ReturnTypeResponsiveLayer<
    T extends HTMLResponsiveComponent,
    U extends AdaptedBreakpoints<U> = never,
> =
    Omit<ReturnTypeVariantsLayer<T, U>, "responsive" | "responsiveConfig" | "breakpoints" | "observerBreakpoints">
    & { currentBreakPoints: (keyof U)[] }

function useResponsiveLayer<
    T extends HTMLResponsiveComponent,
    U extends AdaptedBreakpoints<U> = never,
>(
    { responsive, responsiveConfig, breakpoints, observerBreakpoints, ...props }: ReturnTypeVariantsLayer<T, U>
): ReturnTypeResponsiveLayer<T, U> {
    const activeBreakpoints = Object.keys(responsive || {});
    const currentBreakPoints = useBreakPoints({ activeBreakpoints, responsiveConfig, breakPoints: breakpoints });

    useEffect(() => {
        isFunction(observerBreakpoints) && observerBreakpoints(currentBreakPoints[currentBreakPoints.length - 1])
    }, [JSON.stringify(currentBreakPoints)])


    const calculateResponsive = () => {
        if (!isObject(responsive)) return props
        const onlyResponsiveProperties: ResponsiveProperties = {
            animate: props["animate"],
            dragConstraints: props["dragConstraints"],
            dragTransition: props["dragTransition"],
            exit: props["exit"],
            initial: props["initial"],
            style: props["style"],
            transition: props["transition"],
            whileDrag: props["whileDrag"],
            whileFocus: props["whileFocus"],
            whileHover: props["whileHover"],
            whileInView: props["whileInView"],
            whileTap: props["whileTap"],
        }
        const res = currentBreakPoints.reduce((acc, breakpoint) => {
            const currentBreakPoints = responsive[breakpoint]
            if (!isObject(currentBreakPoints)) return acc
            return joinResponsiveProperties(acc, currentBreakPoints)
        }, onlyResponsiveProperties)

        return { ...props, ...res }
    };

    return {
        ...calculateResponsive(),
        currentBreakPoints: currentBreakPoints
    }
};

export type { ReturnTypeResponsiveLayer };
export default useResponsiveLayer;

