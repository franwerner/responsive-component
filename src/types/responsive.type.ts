import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";
import { MotionProps, MotionStyle, MotionValue } from "framer-motion";
import { ReactNode } from "react";
import { AnimatableOnly, AnimationProperties, AnimationComponentProps, AnimationConsumer, AnimationVariants } from "./animate.type";

type HTMLResponsiveComponent = keyof JSX.IntrinsicElements

type ResponsiveProperties<C = any,K extends AnimationVariants<any,C> = never> = {
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
            [L in keyof ResponsiveProperties<C,K>]?: ResponsiveProperties<C,
                {
                    [K2 in keyof K]?:
                    K[K2] extends AnimationConsumer<infer Custom> ?
                    AnimationConsumer<Custom> :
                    K[K2] extends AnimationProperties ?
                    AnimationProperties :
                    K[K2]/**
                    Deja el tipado ya generado previamente por el usuario en base a createVariants o usando AnimationVariants<generico>,
                    Los otros casos son para cuando los consumer y properties se crean directamente en el component, al no definir un tipado explicamente se crearan aca.
                    */
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

