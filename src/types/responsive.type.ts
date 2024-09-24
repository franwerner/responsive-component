import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";
import { MotionProps, MotionStyle, MotionValue } from "framer-motion";
import { ReactNode } from "react";
import { AnimateComponentProps, AnimatableOnly } from "./animate.type";

type HTMLResponsiveComponent = keyof JSX.IntrinsicElements

type ResponsiveProperties = {
    style: MotionStyle,
    dragConstraints: MotionProps["dragConstraints"],
    transition: MotionProps["transition"],
    dragTransition: MotionProps["dragTransition"]

} & AnimatableOnly

type ResponsiveAnimate<U extends AdaptedBreakpoints<U>> = {
    [K in keyof U]?: {
        [L in keyof ResponsiveProperties]?: ResponsiveProperties[L]
    }
}

type ResponsiveConfig<U extends AdaptedBreakpoints<U>> = {
    [K in keyof U]?: { maxWidth?: boolean, minWidth?: boolean }
}

type AdditionalProps<T extends HTMLResponsiveComponent> = {
    as?: T;
    children?: ReactNode | MotionValue<any>
    // controls?: boolean //NO AGREGAR DE MOMENTO.
}

type ObserverBreakpoints<U extends AdaptedBreakpoints<U>> = (breakpoints?: keyof U) => void

type ChildrenResponsive<U extends AdaptedBreakpoints<U>> = ((breakpoint?: keyof U) => Element | ReactNode)

type ResponsiveProps<T extends HTMLResponsiveComponent = "div", U extends AdaptedBreakpoints<U> = never> = {
    responsive?: ResponsiveAnimate<U>;
    responsiveConfig?: ResponsiveConfig<U>;
    breakpoints: U
    observerBreakpoints?: ObserverBreakpoints<U>
    children?: AdditionalProps<T>["children"] | ChildrenResponsive<U> | (ChildrenResponsive<U> | AdditionalProps<T>["children"])[]
} & Omit<AnimateComponentProps<T>, "children">



export type { HTMLResponsiveComponent, ResponsiveProps, ResponsiveAnimate, AdditionalProps, ResponsiveConfig, ObserverBreakpoints, ResponsiveProperties };
