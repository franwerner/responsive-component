import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";
import { MotionProps, MotionStyle, MotionValue } from "framer-motion";
import { ReactNode } from "react";
import { AnimatableOnly, AnimationProperties, AnimationComponentProps, AnimationConsumer, AnimationVariants } from "./animate.type";

type HTMLResponsiveComponent = keyof JSX.IntrinsicElements

type ResponsiveProperties<T extends AnimationVariants<any> = never> = {
    style?: MotionStyle,
    dragConstraints?: MotionProps["dragConstraints"],
    transition?: MotionProps["transition"],
    dragTransition?: MotionProps["dragTransition"]
    custom?: any
} & AnimatableOnly<T>

type ResponsiveAnimate<
    T extends AdaptedBreakpoints<any>,
    U extends AnimationVariants<any> = never
> = {
        [K in keyof T]?: {
            [L in keyof ResponsiveProperties<U>]?: ResponsiveProperties<
                {
                    [K2 in keyof U]?: //Re-definimos lo AnimationVariants en cada breakpont para que sean independiente de los definidos globalmente, solo contara con el tipado del custom.
                    U[K2] extends AnimationConsumer<infer Custom> ?
                    AnimationConsumer<Custom> :
                    U[K2] extends AnimationProperties ?
                    AnimationProperties :
                    U[K2] // Dejamo el tipado ya generado , que siempre sera AnimationProperties o AnimationConsumer
                }
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
    K extends AnimationVariants<any> = never
> = {
    responsive?: ResponsiveAnimate<U, K>;
    responsiveConfig?: ResponsiveConfig<U>;
    breakpoints: U
    observerBreakpoints?: ObserverBreakpoints<U>
    children?: AdditionalProps<T>["children"] | ChildrenResponsive<U> | (ChildrenResponsive<U> | AdditionalProps<T>["children"])[]
} & Omit<AnimationComponentProps<T, K>, "children">



export type { AdditionalProps, HTMLResponsiveComponent, ObserverBreakpoints, ResponsiveAnimate, ResponsiveConfig, ResponsiveProperties, ResponsiveProps };

