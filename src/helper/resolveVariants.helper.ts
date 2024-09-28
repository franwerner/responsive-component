import { AnimationProperties, AnimationVariants, VariantsAndProperties } from "@/types/animate.type"
import { isFunction, isString } from "my-utilities"


const resolveVariants = <T extends AnimationVariants<any>>(variants: T = ({} as T), custom: any):
    (animable_type: VariantsAndProperties<T>) => (AnimationProperties | undefined) => {

    return (animable_type) => {
        if (isString(animable_type)) {
            const currentVariant = variants[animable_type]
            return isFunction(currentVariant) ? currentVariant(custom) : currentVariant
        } else if (Array.isArray(animable_type)) {
            return animable_type.reduce((acc, current) => {
                const currentVariant = variants[current]
                return {
                    ...acc,
                    ...(isFunction(currentVariant) ? currentVariant(custom) : currentVariant)
                }
            }, {} as AnimationProperties)
        }
        return animable_type
    }

}
export default resolveVariants