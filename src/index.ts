import { MotionProps, MotionValue, TargetAndTransition, motion } from "framer-motion";
import { AllHTMLAttributes, AriaAttributes, ComponentProps, DOMAttributes, MutableRefObject, ReactNode, RefObject, SVGAttributes } from "react";
import { BreakPointsKeys } from "./constant/breakpoints.constant";
import { RequiredAllProperties } from "../myHelpers/types/RequiredAllProperties";

type HTMLMotionComponents = keyof typeof motion

type AllAtributes = SVGAttributes<AriaAttributes & DOMAttributes<"svg">> & AllHTMLAttributes<"">

type AllKeysHtmlAtt = Exclude<keyof AllAtributes, "width" | "height" | "x" | "y" | "display" | "scale" | "color" | "opacity">

type RemoveNotStylesKeys<T> = {
    [K in keyof T as K extends (AllKeysHtmlAtt | Function) ? never : K]?: T[K]
}

type OmitMotionProps = Omit<MotionProps, "variants" | "custom" | "animate" | "exit" | "initial" | "whileFocus" | "whileHover" | "whileInView" | "whileTap" | "whileDrag">

type MotionAnimate = RemoveNotStylesKeys<TargetAndTransition>

type RemoveFunctionsProperties<T> = {
    [K in keyof T as T[K] extends Function ? never : K]?: T[K];
};

type DefaultMotionPropsModification = {
    animate?: MotionAnimate
    exit?: MotionAnimate
    initial?: MotionAnimate
    whileFocus?: MotionAnimate
    whileHover?: MotionAnimate
    whileInView?: MotionAnimate
    whileTap?: MotionAnimate
    whileDrag?: MotionAnimate
} & OmitMotionProps

type MotionPropsModification = RemoveFunctionsProperties<RequiredAllProperties<DefaultMotionPropsModification>> //Se remueve las funciones,ya que no requieren ser diferentes entre los breakpoints.

type ResponsiveMotionProps = {
    [K in BreakPointsKeys]?: MotionPropsModification
}

type BreakPointConfig = { maxWidth?: boolean, minWidth?: boolean }

type ResponsiveConfig = {
    [K in BreakPointsKeys]?: BreakPointConfig
}

type RefResponsiveComponent = { _REF?: MutableRefObject<any> | RefObject<any> }

type DefaultProps<T extends HTMLMotionComponents> = ComponentProps<T> & DefaultMotionPropsModification & RefResponsiveComponent

type ResponsiveProps<T extends HTMLMotionComponents> = {
    responsive?: ResponsiveMotionProps;
    responsiveConfig?: ResponsiveConfig;
} & DefaultProps<T>

type AllProps<T extends HTMLMotionComponents = HTMLMotionComponents> = {
    as?: T;
    children?: ReactNode |  MotionValue<number | string>
} & ResponsiveProps<T>;

type LiteProps<T extends HTMLMotionComponents = HTMLMotionComponents> = Omit<AllProps<T>, "responsive" | "responsiveConfig">

export type { DefaultProps, RefResponsiveComponent, HTMLMotionComponents, AllProps, LiteProps, ResponsiveProps, ResponsiveConfig, MotionAnimate, BreakPointConfig };
