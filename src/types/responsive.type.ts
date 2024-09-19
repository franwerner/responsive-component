import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";
import { MotionStyle, MotionValue } from "framer-motion";
import { ReactNode } from "react";
import { AnimateComponentProps, AnimatableOnly } from "./animate.type";

type HTMLResponsiveComponent = keyof JSX.IntrinsicElements

type ResponsiveAnimate<U extends AdaptedBreakpoints<U>> = {
    [K in keyof U]?: AnimatableOnly & { style?: MotionStyle }
}

type ResponsiveConfig<U extends AdaptedBreakpoints<U>> = {
    [K in keyof U]?: { maxWidth?: boolean, minWidth?: boolean }
}

type AdditionalProps<T extends HTMLResponsiveComponent> = {
    as?: T;
    children?:ReactNode | MotionValue<any>
    // controls?: boolean //NO AGREGAR DE MOMENTO.
}


type ResponsiveProps<T extends HTMLResponsiveComponent = "div", U extends AdaptedBreakpoints<U> = never> = {
    responsive?: ResponsiveAnimate<U>;
    responsiveConfig?: ResponsiveConfig<U>;
    breakpoints: U
    children?: AdditionalProps<T>["children"] | (() => Element | ReactNode)
} & Omit<AnimateComponentProps<T>, "children">



export type { HTMLResponsiveComponent, ResponsiveProps, ResponsiveAnimate, AdditionalProps, ResponsiveConfig };
