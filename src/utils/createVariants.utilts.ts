import { AnimationConsumer, AnimationProperties, AnimationVariants } from "@/types/animate.type";

const createVariants = <T extends {
    [K in keyof T]: T[K] extends AnimationConsumer<infer P> ?
    AnimationConsumer<P> :
    AnimationProperties
}>
    (variants: AnimationVariants<T>) => variants

export default createVariants