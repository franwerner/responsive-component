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

type AnimationVariantsLabel<K extends AnimationVariants<any> = never> = Extract<keyof K, string> | (Extract<keyof K, string>)[]

type VariantsLabelAndProperties<K extends AnimationVariants<any>> = AnimationProperties | AnimationVariantsLabel<K>

type AnimatableOnly<C = any, K extends AnimationVariants<any,C> = never> = {
    variants?: K
    animate?: VariantsLabelAndProperties<K>
    exit?: VariantsLabelAndProperties<K>
    initial?: VariantsLabelAndProperties<K>
    whileFocus?: VariantsLabelAndProperties<K>
    whileHover?: VariantsLabelAndProperties<K>
    whileInView?: VariantsLabelAndProperties<K>
    whileTap?: VariantsLabelAndProperties<K>
    whileDrag?: VariantsLabelAndProperties<K>
}

type AnimationConsumer<C extends any> = (custom?: C) => AnimationProperties
type AnimationVariant<C> = AnimationProperties | AnimationConsumer<C>
type AnimationVariants<K extends string = string, C = any> = Partial<Record<K, AnimationVariant<C>>>

type AnimationComponentProps<
    T extends HTMLResponsiveComponent = "div",
    C = any,
    K extends AnimationVariants<any, C> = never
> = ComponentProps<T> & (OmitMotionProps & AnimatableOnly<C, K>) & { custom?: C }

export type {
    AnimatableOnly,
    AnimationComponentProps,
    AnimationProperties,
    AnimationVariants,
    AnimationVariant,
    AnimationVariantsLabel,
    AnimationConsumer,
    VariantsLabelAndProperties,
}

