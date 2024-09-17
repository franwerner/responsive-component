import { MotionProps, MotionValue, TargetAndTransition, motion } from "framer-motion";
import { AllHTMLAttributes, AriaAttributes, ComponentProps, DOMAttributes, MutableRefObject, ReactNode, RefObject, SVGAttributes } from "react";
import { RequiredAllProperties } from "my-utilities";
import { Breakpoints } from "./index";

type HTMLMotionComponents = keyof typeof motion

type AllAtributes = SVGAttributes<AriaAttributes & DOMAttributes<"svg">> & AllHTMLAttributes<"">

type AllKeysHtmlAtt = Exclude<keyof AllAtributes, "width" | "height" | "x" | "y" | "display" | "scale" | "color" | "opacity">

type RemoveNotStylesKeys<T> = {
    [K in keyof T as K extends (AllKeysHtmlAtt | Function) ? never : K]?: T[K]
}

type OmitMotionProps = Omit<MotionProps,  "custom" | "animate" | "exit" | "initial" | "whileFocus" | "whileHover" | "whileInView" | "whileTap" | "whileDrag">

type AnimateProps = RemoveNotStylesKeys<TargetAndTransition>

type RemoveFunctionsProperties<T> = {
    [K in keyof T as T[K] extends Function ? never : K]?: T[K];
};

type DefaultMotionPropsModification = {
    animate?: AnimateProps
    exit?: AnimateProps
    initial?: AnimateProps
    whileFocus?: AnimateProps
    whileHover?: AnimateProps
    whileInView?: AnimateProps
    whileTap?: AnimateProps
    whileDrag?: AnimateProps
} & OmitMotionProps

type MotionPropsModification = RemoveFunctionsProperties<RequiredAllProperties<DefaultMotionPropsModification>> //Se remueve las funciones,ya que no requieren ser diferentes entre los breakpoints.

type ResponsiveMotionProps = {
    [K in Breakpoints]?: MotionPropsModification
}

type BreakPointConfig = { maxWidth?: boolean, minWidth?: boolean }

type ResponsiveConfig = {
    [K in Breakpoints]?: BreakPointConfig
}

type RefResponsiveComponent = { _REF?: MutableRefObject<any> | RefObject<any> }

type DefaultProps<T extends HTMLMotionComponents> = ComponentProps<T> & DefaultMotionPropsModification & RefResponsiveComponent

type ResponsiveProps<T extends HTMLMotionComponents> = {
    responsive?: ResponsiveMotionProps;
    responsiveConfig?: ResponsiveConfig;
} & DefaultProps<T>

type AllProps<T extends HTMLMotionComponents = HTMLMotionComponents> = {
    as?: T;
    children?: ReactNode | MotionValue<number | string>
    breakpoints: { [K in Breakpoints]: number }
} & ResponsiveProps<T>;

type LiteProps<T extends HTMLMotionComponents = HTMLMotionComponents> = Omit<AllProps<T>, "responsive" | "responsiveConfig">

export type { DefaultProps, RefResponsiveComponent, HTMLMotionComponents, AllProps, LiteProps, ResponsiveProps, ResponsiveConfig, AnimateProps };
