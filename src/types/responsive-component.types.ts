import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";
import { MotionProps, MotionStyle, MotionValue, TargetAndTransition } from "framer-motion";
import { AllHTMLAttributes, AriaAttributes, ComponentProps, DOMAttributes, MutableRefObject, ReactNode, RefObject, SVGAttributes } from "react";

type HTMLMotionComponents = keyof JSX.IntrinsicElements

type AllAtributes = SVGAttributes<AriaAttributes & DOMAttributes<"svg">> & AllHTMLAttributes<"">

type AllKeysHtmlAtt = Exclude<keyof AllAtributes, "width" | "height" | "x" | "y" | "display" | "scale" | "color" | "opacity">

type RemoveNotStylesKeys<T> = {
    [K in keyof T as K extends (AllKeysHtmlAtt | Function) ? never : K]?: T[K]
}

type OmitMotionProps = Omit<MotionProps, "custom" | "animate" | "exit" | "initial" | "whileFocus" | "whileHover" | "whileInView" | "whileTap" | "whileDrag">

type AnimateProps = RemoveNotStylesKeys<TargetAndTransition>


type OnlyAnimableProps = {
    animate?: AnimateProps
    exit?: AnimateProps
    initial?: AnimateProps
    whileFocus?: AnimateProps
    whileHover?: AnimateProps
    whileInView?: AnimateProps
    whileTap?: AnimateProps
    whileDrag?: AnimateProps
    style?: MotionStyle
}

type ResponsiveMotionProps<U> = {
    [K in keyof U]?: OnlyAnimableProps
}

type BreakPointConfig = { maxWidth?: boolean, minWidth?: boolean }

type ResponsiveConfig<U> = {
    [K in keyof U]?: BreakPointConfig
}

type RefResponsiveComponent = { _REF?: MutableRefObject<any> | RefObject<any> }

type DefaultProps<T extends HTMLMotionComponents> = ComponentProps<T> & (OmitMotionProps & OnlyAnimableProps) & RefResponsiveComponent

type ResponsiveProps<T extends HTMLMotionComponents, U> = {
    responsive?: ResponsiveMotionProps<U>;
    responsiveConfig?: ResponsiveConfig<U>;
    breakpoints: AdaptedBreakpoints<U>
} & DefaultProps<T>

type AllProps<T extends HTMLMotionComponents = "div", U = never> = {
    as?: T;
    children?: ReactNode | MotionValue<number | string>
    controls?: boolean
} & ResponsiveProps<T, U>;


type LiteProps<T extends HTMLMotionComponents = "div"> = Omit<AllProps<T>, "responsive" | "responsiveConfig">

export type { AllProps, AnimateProps, DefaultProps, HTMLMotionComponents, LiteProps, RefResponsiveComponent, ResponsiveConfig, ResponsiveMotionProps, ResponsiveProps };

