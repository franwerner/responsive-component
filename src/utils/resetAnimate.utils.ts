import {isColor,isNumber} from "my-utilities"
import { AnimateProperties } from "@/types/animate.type"

export const DefaultValues: AnimateProperties = { //Estos son valores que no puede resetear por defecto correctamente.
    borderBottom: "0px solid #FFF",
    borderTop: "0px solid #FFF",
    borderLeft: "0px solid #FFF",
    borderRight: "0px solid #FFF",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftStyle: "solid",
    borderTopStyle: "solid",
    background: "#FFF",
    backgroundColor: "#FFF",
    scale: 1,
    opacity: 1,
    width: "auto",
    height: "auto",
    color: "#000",
}

const verificateValue = (value: any) => {
    const isArray = Array.isArray(value) ? value[0] : value
    if (isColor(isArray)) return "#FFF"
    else if (isNumber(isArray)) return 0
    else return ""
}

const resetAnimate = (cache: AnimateProperties = {}) => {

    const reset: AnimateProperties = {}

    for (const k in cache) {
        const key = k as keyof typeof cache
        const cacheValue = cache[key]
        const isDefaultValue = DefaultValues[key]
        if(isDefaultValue || Array.isArray(cacheValue)){
            const res = isDefaultValue || verificateValue(cacheValue)
            Object.assign(reset, { [key]: res })
        }
    }
    return reset

}
export default resetAnimate