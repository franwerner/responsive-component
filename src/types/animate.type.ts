import { MotionProps, TargetAndTransition } from "framer-motion"
import { AllHTMLAttributes, AriaAttributes, ComponentProps, DOMAttributes, SVGAttributes } from "react"
import { HTMLResponsiveComponent } from "./responsive.type"


type AllAtributes = SVGAttributes<AriaAttributes & DOMAttributes<"svg">> & AllHTMLAttributes<"">

type AllKeysHtmlAtt = Exclude<keyof AllAtributes, "width" | "height" | "x" | "y" | "display" | "scale" | "color" | "opacity">

type RemoveNotStylesKeys<T> = {
    [K in keyof T as K extends (AllKeysHtmlAtt | Function) ? never : K]?: T[K]
}

type OmitMotionProps = Omit<MotionProps, "custom" | "animate" | "exit" | "initial" | "whileFocus" | "whileHover" | "whileInView" | "whileTap" | "whileDrag">

type AnimateProperties = RemoveNotStylesKeys<TargetAndTransition>

type AnimatableOnly = {
    animate?: AnimateProperties
    exit?: AnimateProperties
    initial?: AnimateProperties
    whileFocus?: AnimateProperties
    whileHover?: AnimateProperties
    whileInView?: AnimateProperties
    whileTap?: AnimateProperties
    whileDrag?: AnimateProperties
}

type AnimateComponentProps<T extends HTMLResponsiveComponent = "div"> = ComponentProps<T> & (OmitMotionProps & AnimatableOnly)



export type {
    AnimateComponentProps,
    AnimateProperties,
    AnimatableOnly
}
