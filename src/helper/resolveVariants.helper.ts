import { AnimationProperties, AnimationVariants, VariantsLabelAndProperties } from "@/types/animate.type"
import { isFunction, isString } from "my-utilities"


const resolveVariants = <C extends any = any,K extends AnimationVariants<any,C> = never>(variants: K = ({} as K), custom?: C):
    (animable_type?: VariantsLabelAndProperties<K>) => (AnimationProperties | undefined) => {

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