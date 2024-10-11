import { MotionProps, TargetAndTransition } from "framer-motion"
import { AllHTMLAttributes, AriaAttributes, ComponentProps, DOMAttributes, SVGAttributes } from "react"
import { HTMLResponsiveComponent } from "./responsive.type"

type AllAtributes = SVGAttributes<AriaAttributes & DOMAttributes<"svg">> & AllHTMLAttributes<"">

type AllKeysHtmlAtt = Exclude<keyof AllAtributes, "width" | "height" | "x" | "y" | "display" | "scale" | "color" | "opacity">

type OnlyStyleProperties<T> = {
    [K in keyof T as K extends (AllKeysHtmlAtt | Function) ? never : K]?: T[K]
}

type OmitMotionProps = Omit<MotionProps, "custom" | "variants" | "animate" | "exit" | "initial" | "whileFocus" | "whileHover" | "whileInView" | "whileTap" | "whileDrag">

type AnimationProperties = OnlyStyleProperties<TargetAndTransition>

type AnimationVariantsLabel<K extends AnimationVariants<any, any>> = Extract<keyof K, string> | (Extract<keyof K, string>)[]

type AnimatableOnly = {
    animate?: AnimationProperties
    exit?: AnimationProperties
    initial?: AnimationProperties
    whileFocus?: AnimationProperties
    whileHover?: AnimationProperties
    whileInView?: AnimationProperties
    whileTap?: AnimationProperties
    whileDrag?: AnimationProperties
}

type CreateVariants<K extends string, C = undefined> = {
    [_ in K]: C extends undefined ? AnimationProperties : (AnimationConsumer<C> | AnimationProperties)
} 

type AnimatableOnlyAndVariants<K extends AnimationVariants<any, any>> = {
    [Key in keyof AnimatableOnly]?: AnimatableOnly[Key] | AnimationVariantsLabel<K>
}

type AnimationConsumer<C> = (custom: C) => AnimationProperties
type AnimationVariants<K, C = undefined> =
    {
        [F in keyof K]?: C extends undefined ?
        AnimationProperties :
        (AnimationConsumer<C> | AnimationProperties)
    }


type AnimationComponentProps<
    T extends HTMLResponsiveComponent,
    K extends AnimationVariants<any, C> = never,
    C = undefined,
> = ComponentProps<T>
    & OmitMotionProps
    & AnimatableOnlyAndVariants<K>
    & { custom?: C, variants?: K}


export type {
    AnimatableOnly,
    AnimationComponentProps,
    AnimationProperties,
    AnimationVariants,
    AnimationVariantsLabel,
    AnimationConsumer,
    CreateVariants
}

