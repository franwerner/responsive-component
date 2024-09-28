import { MotionProps, TargetAndTransition } from "framer-motion"
import { AllHTMLAttributes, AriaAttributes, ComponentProps, DOMAttributes, SVGAttributes } from "react"
import { HTMLResponsiveComponent } from "./responsive.type"


type AllAtributes = SVGAttributes<AriaAttributes & DOMAttributes<"svg">> & AllHTMLAttributes<"">

type AllKeysHtmlAtt = Exclude<keyof AllAtributes, "width" | "height" | "x" | "y" | "display" | "scale" | "color" | "opacity">

type RemoveNotStylesKeys<T> = {
    [K in keyof T as K extends (AllKeysHtmlAtt | Function) ? never : K]?: T[K]
}

type OmitMotionProps = Omit<MotionProps, "variants" | "animate" | "exit" | "initial" | "whileFocus" | "whileHover" | "whileInView" | "whileTap" | "whileDrag">

type AnimationProperties = RemoveNotStylesKeys<TargetAndTransition>

type AnimationVariantsLabel<T extends AnimationVariants<any> = never> = Extract<keyof T, string> | (Extract<keyof T, string>)[]

type VariantsAndProperties<T extends AnimationVariants<any>> = AnimationProperties | AnimationVariantsLabel<T>

type AnimatableOnly<T extends AnimationVariants<any> = never> = {
    animate?: VariantsAndProperties<T>
    exit?: VariantsAndProperties<T>
    initial?: VariantsAndProperties<T>
    whileFocus?: VariantsAndProperties<T>
    whileHover?: VariantsAndProperties<T>
    whileInView?: VariantsAndProperties<T>
    whileTap?: VariantsAndProperties<T>
    whileDrag?: VariantsAndProperties<T>
    variants?: T
}

type AnimationConsumer<T = any> = (custom: T) => AnimationProperties
type AnimationVariant = AnimationProperties | AnimationConsumer
type AnimationVariants<T> = {
    [K in keyof T]?:
    T[K] extends AnimationConsumer<infer P> ? AnimationConsumer<P> : //Nos ayuda con las funciones, para que se infierar como consumer.
    T[K] extends AnimationProperties ? T[K] :
    T[K] extends AnimationConsumer ?
    T[K] :
    never

};
type AnimationComponentProps<
    T extends HTMLResponsiveComponent = "div",
    U extends AnimationVariants<any> = never
> = ComponentProps<T> & (OmitMotionProps & AnimatableOnly<U>)


export type {
    AnimatableOnly,
    AnimationComponentProps,
    AnimationProperties,
    AnimationVariants,
    AnimationVariant,
    AnimationVariantsLabel,
    AnimationConsumer,
    VariantsAndProperties
}

