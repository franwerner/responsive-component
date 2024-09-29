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

type VariantsLabelAndProperties<K extends AnimationVariants<any> = never> = AnimationProperties | AnimationVariantsLabel<K>

type AnimatableOnly<C = any, K extends AnimationVariants<any, C> = never> = {
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

const G: AnimatableOnly<string, { hidden: AnimationConsumer }> = {
    variants: {
        hidden: (f: number) => ({})
    }
}

type AnimationConsumer<C = any> = (custom: C) => AnimationProperties
type AnimationVariant = AnimationProperties | AnimationConsumer
type AnimationVariants<K, C = any> = {
    [Key in keyof K]?:
    K[Key] extends  Function ? AnimationConsumer<C> :
    K[Key] extends AnimationProperties ?
    AnimationProperties :
    K[Key] extends AnimationConsumer ?
    AnimationConsumer<C> :
    never

};
type AnimationComponentProps<
    T extends HTMLResponsiveComponent = "div",
    C = any,
    K extends AnimationVariants<any, C> = never
> = ComponentProps<T> & (OmitMotionProps & AnimatableOnly<C, K>) & { custom: C }


export type {
    AnimatableOnly,
    AnimationComponentProps,
    AnimationProperties,
    AnimationVariants,
    AnimationVariant,
    AnimationVariantsLabel,
    AnimationConsumer,
    VariantsLabelAndProperties
}

