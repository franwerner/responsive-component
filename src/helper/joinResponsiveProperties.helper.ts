import { ResponsiveProperties } from "@/types/responsive.type";
import { isObject } from "my-utilities";


const joinResponsiveProperties = (
    primary: ResponsiveProperties,
    secondary: ResponsiveProperties
) => {
    const props = { ...primary } as any
    /**
    * Utilizamos una aserción `any` porque TypeScript no puede garantizar que la asignación de un nuevo valor en el objeto `props`
    * sea compatible con el tipo esperado en el objeto. Aunque verificamos que `primary` y `secondary` son del mismo tipo,
    * TypeScript no permite la asignación de nuevos valores a `props` sin una aserción explícita, debido a posibles diferencias
    * en los tipos de los objetos.
    */

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


