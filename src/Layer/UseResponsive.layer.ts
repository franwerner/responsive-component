import { ResponsiveComponentProps } from "@/components/ResponsiveComponent";
import joinResponsiveProperties from "@/helper/joinResponsiveProperties.helper";
import useBreakPoints from "@/hooks/useBreakPoints.hook.js";
import { AnimationVariants } from "@/types/animate.type";
import { HTMLResponsiveComponent, ResponsiveProperties } from "@/types/responsive.type";
import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";
import { isFunction, isObject } from "my-utilities";
import { useEffect } from "react";

type ReturnTypeResponsiveLayer<
    T extends HTMLResponsiveComponent,
    U extends AdaptedBreakpoints<U> = never,
    C = any,
    K extends AnimationVariants<C,any> = never
> =
    Omit<ResponsiveComponentProps<T, U, C, K>, "responsive" | "responsiveConfig" | "breakpoints" | "observerBreakpoints">
    & { currentBreakPoints: (keyof U)[] }

function useResponsiveLayer<
    T extends HTMLResponsiveComponent,
    U extends AdaptedBreakpoints<U> = never,
    C = any,
    K extends AnimationVariants<C,any> = never
>(
    { responsive, responsiveConfig, breakpoints, observerBreakpoints, ...props }: ResponsiveComponentProps<T, U, C, K>
): ReturnTypeResponsiveLayer<T, U, C, K> {
    const activeBreakpoints = Object.keys(responsive || {});

    const currentBreakPoints = useBreakPoints({ activeBreakpoints, responsiveConfig, breakPoints: breakpoints });

    useEffect(() => {
        isFunction(observerBreakpoints) && observerBreakpoints(currentBreakPoints[currentBreakPoints.length - 1])
    }, [JSON.stringify(currentBreakPoints)])


    const calculateResponsive = () => {
        if (!isObject(responsive)) return props;
        const {
            animate,
            dragConstraints,
            dragTransition,
            exit,
            initial,
            style,
            transition,
            variants,
            whileDrag,
            whileFocus,
            whileHover,
            whileInView,
            whileTap,
            ...rest } = props

        const onlyResponsiveProperties: ResponsiveProperties<C,K> = {
            animate,
            dragConstraints,
            dragTransition,
            exit,
            initial,
            style,
            transition,
            variants,
            whileDrag,
            whileFocus,
            whileHover,
            whileInView,
            whileTap,
        }
        const res = currentBreakPoints.reduce((acc, breakpoint) => {
            const currentBreakPoints = responsive[breakpoint] as ResponsiveProperties<C,K>
            if (!isObject(currentBreakPoints)) return acc
            return joinResponsiveProperties(acc, currentBreakPoints)
        }, onlyResponsiveProperties)

        return { ...rest, ...res } as ReturnTypeResponsiveLayer<T, U, C, K>
    };

    return {
        ...calculateResponsive(),
        currentBreakPoints: currentBreakPoints
    }
};

export type { ReturnTypeResponsiveLayer };
export default useResponsiveLayer;

