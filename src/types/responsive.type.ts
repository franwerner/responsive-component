import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";
import { MotionProps, MotionStyle, MotionValue } from "framer-motion";
import { ReactNode } from "react";
import { AnimatableOnly, AnimationComponentProps, AnimationVariants } from "./animate.type";

type HTMLResponsiveComponent = keyof JSX.IntrinsicElements

type ResponsiveProperties = {
    style?: MotionStyle,
    dragConstraints?: MotionProps["dragConstraints"],
    transition?: MotionProps["transition"],
    dragTransition?: MotionProps["dragTransition"]
} & AnimatableOnly


type ResponsiveAnimate<
    U extends AdaptedBreakpoints<any>,
> = { [_ in keyof U]?: ResponsiveProperties }

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
    responsive?: ResponsiveAnimate<U>;
    responsiveConfig?: ResponsiveConfig<U>;
    breakpoints: U
    observerBreakpoints?: ObserverBreakpoints<U>
    children?: AdditionalProps<T>["children"] | ChildrenResponsive<U> | (ChildrenResponsive<U> | AdditionalProps<T>["children"])[]
} & Omit<AnimationComponentProps<T, C, K>, "children">



export type { AdditionalProps, HTMLResponsiveComponent, ObserverBreakpoints, ResponsiveAnimate, ResponsiveConfig, ResponsiveProperties, ResponsiveProps };

