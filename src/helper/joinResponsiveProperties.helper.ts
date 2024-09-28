import { AnimationProperties, AnimationVariants, AnimationConsumer } from "@/types/animate.type";
import { ResponsiveProperties } from "@/types/responsive.type";
import { isFunction, isObject } from "my-utilities";


const joinVariants = <T extends AnimationVariants<any>>(primary: T, secondary: T) => {

    const props = {...primary}

    for (const key in secondary) {
        const current_p = primary[key]
        const current_s = secondary[key]
        if (isObject(current_p) && isObject(current_s)) {
            props[key] = { ...current_p, ...current_s }
        } else if (isFunction<AnimationConsumer>(current_p) && isFunction<AnimationConsumer>(current_s)) {
            props[key] = (custom: any): AnimationProperties => {
                return { ...current_p(custom), ...current_s(custom) }
            }
        } else {
            props[key] = current_s
        }
    }
    return props
}

const joinResponsiveProperties = <T extends AnimationVariants<any>>(primary: ResponsiveProperties<T>, secondary: ResponsiveProperties<T>) => {

    const props = {...primary}

    for (const k in secondary) {
        const key = k as keyof ResponsiveProperties<T>
        const current_p = primary[key]
        const current_s = secondary[key]
        if (key === "variants") {
            props[key] = joinVariants(current_p, current_s)
        }
        else if (isObject(current_p) && isObject(current_s)) {
            props[key] = { ...current_p, ...current_s }
        } else if (Array.isArray(current_p) && Array.isArray(current_s)) {
            props[key] = [...current_p, ...current_s]
        } else {
            props[key] = current_s
        }

    }

    return props

};

export default joinResponsiveProperties