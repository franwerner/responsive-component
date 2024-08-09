import isColor from "my-utilities/src/utils/isColor"
import isNumber from "my-utilities/src/utils/isNumber"
import { MotionAnimate } from ".."

export const DefaultValues: MotionAnimate = { //Estos son valores que no puede resetear por defecto correctamente.
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
interface IResettableProperties {
    animate?: MotionAnimate,
}

const resettableProperties = ({ animate = {} }: IResettableProperties) => { 
//Solo se almacenan las propieades que estan en DefaultValues o son un array.
    const filterBoilerPlate = Object.entries(animate).filter(([key, value]) => {
        const isArray = Array.isArray(value)
        const isDefaultValues = key in DefaultValues
        return (isArray || isDefaultValues)
    })

    return Object.fromEntries(filterBoilerPlate)
}

const verificateValue = (value: any) => {
    const isArray = Array.isArray(value) ? value[0] : value
    if (isColor(isArray)) return "#FFF"
    else if (isNumber(isArray)) return 0
    else return ""
}

const resetAnimate = (cache: MotionAnimate = {}) => {

    const reset: MotionAnimate = {}

    for (const k in cache) {
        const key = k as keyof typeof cache
        const cacheValue = cache[key]
        const isDefaultValue = DefaultValues[key]
        const res = isDefaultValue || verificateValue(cacheValue)
        Object.assign(reset, { [key]: res })
    }
    return reset

}
export { resettableProperties }
export default resetAnimate

