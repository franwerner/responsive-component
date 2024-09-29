import { ResponsiveProperties } from "@/types/responsive.type";
import { isObject } from "my-utilities";


const joinResponsiveProperties = (
    primary: ResponsiveProperties,
    secondary: ResponsiveProperties
) => {
    const props = { ...primary } as any

    for (const k in secondary) {
        const key = k as keyof ResponsiveProperties
        const current_p = primary[key]
        const current_s = secondary[key]

        if (isObject(current_p) && isObject(current_s)) {
            props[key] = { ...current_p, ...current_s }
        } else if (Array.isArray(current_p) && Array.isArray(current_s)) {
            props[key] = [...current_p, ...current_s]
        } else {
            props[key] = current_s
        }

    }

    return props as ResponsiveProperties

};

export default joinResponsiveProperties


