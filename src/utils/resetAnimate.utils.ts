import { isColor, isNumber } from "my-utilities"
import { AnimateProperties } from "@/types/animate.type"


export const DefaultValues: AnimateProperties = {
    borderBottom: "0px solid #FFF",
    borderTop: "0px solid #FFF",
    borderLeft: "0px solid #FFF",
    borderRight: "0px solid #FFF",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftStyle: "solid",
    borderTopStyle: "solid",
    scale: 1,
    opacity: 1,
    width: "auto",
    height: "auto",
    color: "#000",
    top: "auto",
    bottom: "auto",
    left: "auto",
    right: "auto",
}

const verificateValue = (value: unknown) => {
    const isArray = Array.isArray(value) ? value[0] : value
    if (isColor(isArray)) return "#FFF"
    else if (isNumber(isArray)) return 0
    else return "0px"
}

const onlyResetteableProperties = (animateProperties: AnimateProperties) => {
    const filterBoilerPlate = Object.entries(animateProperties).filter(([key, value]) => {
        const isArray = Array.isArray(value)

        const isDefaultValues = key in DefaultValues
        return (isArray || isDefaultValues)
    })

    return Object.fromEntries(filterBoilerPlate)
}

const resetAnimate = (cache: AnimateProperties = {}) => {

    const reset: AnimateProperties = {}

    for (const k in cache) {
        const key = k as keyof typeof cache
        const cacheValue = cache[key]
        const isDefaultValue = DefaultValues[key] 
        const res = isDefaultValue ?? verificateValue(cacheValue)
        Object.assign(reset, { [key]: res })
    }
    return reset

}
export { onlyResetteableProperties }
export default resetAnimate