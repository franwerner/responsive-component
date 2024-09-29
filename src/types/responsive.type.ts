import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";
import { MotionProps, MotionStyle, MotionValue } from "framer-motion";
import { ReactNode } from "react";
import { AnimatableOnly, AnimationComponentProps, AnimationConsumer, AnimationProperties, AnimationVariants } from "./animate.type";

type HTMLResponsiveComponent = keyof JSX.IntrinsicElements

type ResponsiveProperties<
    C = any,
    K extends AnimationVariants<any, C> = never
> = {
    style?: MotionStyle,
    dragConstraints?: MotionProps["dragConstraints"],
    transition?: MotionProps["transition"],
    dragTransition?: MotionProps["dragTransition"]
} & AnimatableOnly<C,K>


type ResponsiveAnimate<
    U extends AdaptedBreakpoints<any>,
    C = any,
    K extends AnimationVariants<any, C> = never
> = {
        [_ in keyof U]?: {
            [L in keyof ResponsiveProperties<C, K>]?:
            ResponsiveProperties<C,
                Partial<Record<keyof K, AnimationProperties | AnimationConsumer<C>>>
            >[L]
        }
    }

type ResponsiveConfig<U extends AdaptedBreakpoints<any>> = {
    [K in keyof U]?: { maxWidth?: boolean, minWidth?: boolean }
}

type AdditionalProps<T extends HTMLResponsiveComponent> = {
    as?: T;
    children?: ReactNode | MotionValue<any>
    // controls?: boolean //NO AGREGAR DE MOMENTO.
}

type ObserverBreakpoints<U extends AdaptedBreakpoints<any>> = (breakpoints?: keyof U) => void

type ChildrenResponsive<U extends AdaptedBreakpoints<any>> = ((breakpoint?: keyof U) => Element | ReactNode)

type ResponsiveProps<
    T extends HTMLResponsiveComponent = "div",
    U extends AdaptedBreakpoints<any> = never,
    C = any,
    K extends AnimationVariants<any, C> = never
> = {
    responsive?: ResponsiveAnimate<U, C, K>;
    responsiveConfig?: ResponsiveConfig<U>;
    breakpoints: U
    observerBreakpoints?: ObserverBreakpoints<U>
    children?: AdditionalProps<T>["children"] | ChildrenResponsive<U> | (ChildrenResponsive<U> | AdditionalProps<T>["children"])[]
} & Omit<AnimationComponentProps<T, C, K>, "children">



export type { AdditionalProps, HTMLResponsiveComponent, ObserverBreakpoints, ResponsiveAnimate, ResponsiveConfig, ResponsiveProperties, ResponsiveProps };

