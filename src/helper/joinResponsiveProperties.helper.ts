import { AnimationProperties, AnimationVariants } from "@/types/animate.type";
import { ResponsiveProperties } from "@/types/responsive.type";
import { isFunction, isObject } from "my-utilities";


const joinVariants = <C = any,K extends object = never>(primary?: AnimationVariants<K,C>, secondary?: AnimationVariants<K,C>) => {

    const props = {...primary}

    for (const key in secondary) {
        const current_p = primary?.[key]
        const current_s = secondary[key]
        if (isObject(current_p) && isObject(current_s)) {
            props[key] = { ...current_p, ...current_s }
        } else if (isFunction(current_p) && isFunction(current_s)) {
            props[key] = (custom: C): AnimationProperties => {
                return { ...current_p(custom), ...current_s(custom) }
            }
        } else {
            props[key] = current_s
        }
    }
    return props
}

const joinResponsiveProperties = <C = any,K extends AnimationVariants<any,C> = never>(primary: ResponsiveProperties<C,K>, secondary: ResponsiveProperties<C,K>) => {

    const props = {...primary}

    for (const k in secondary) {
        const key = k as keyof ResponsiveProperties<C,K>
        const current_p = primary[key]
        const current_s = secondary[key]
        if (key === "variants") {
            const g = current_s
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

    return props as ResponsiveProperties<C,K>

};

export default joinResponsiveProperties