import { ResponsiveComponentProps } from "@/components/ResponsiveComponent"
import resolveVariants from "@/helper/resolveVariants.helper"
import { AnimatableOnly, AnimationVariants } from "@/types/animate.type"
import { HTMLResponsiveComponent } from "@/types/responsive.type"
import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils"
import { isObject } from "my-utilities"

const animableKeys: (keyof AnimatableOnly)[] = ["whileHover", "whileDrag", "whileTap", "whileFocus", "whileInView", "initial", "animate"]

type ReturnTypeVariantsLayer<
    T extends HTMLResponsiveComponent,
    U extends AdaptedBreakpoints<any>,
> = Omit<ResponsiveComponentProps<T, U, any, any>, keyof AnimatableOnly | "custom" | "variants"> & AnimatableOnly

const useVariantsLayer = <
    T extends HTMLResponsiveComponent,
    U extends AdaptedBreakpoints<any>,
    K extends AnimationVariants<any, C>,
    C,
>
    ({ variants, custom, ...props }: ResponsiveComponentProps<T, U, K, C>): ReturnTypeVariantsLayer<T, U> => {

    const animableType = resolveVariants<AnimationVariants<any, C>,C>(variants, custom)

    const process = animableKeys.reduce((acc, current) => {
        const currentVariant = props[current]
        return {
            ...acc,
            [current]: isObject(currentVariant) ? currentVariant : animableType(currentVariant)
        }
    }, {} as AnimatableOnly)

    return {
        ...props,
        ...process

    } as ReturnTypeVariantsLayer<T, U>
}

export type { ReturnTypeVariantsLayer }
export default useVariantsLayer