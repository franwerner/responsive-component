import { AnimationVariants } from "@/types/animate.type";

const createVariants = <C = any,K extends AnimationVariants<any,C> = AnimationVariants<any,C>>(variants: K) => variants

export default createVariants