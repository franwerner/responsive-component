import isObject from "my-utilities/src/utils/isObject"
type Directions = "Top" | "Left" | "Right" | "Bottom"
type Fn = (i: Directions) => object | undefined

const getDirections = (fn: Fn) => {
    const directions: Directions[] = ["Top", "Left", "Right", "Bottom"]
    return directions.reduce((acc, current) => {
        const res = fn(current)
        if (isObject(res)) return { ...acc, ...res }
        else return acc
    }, {})
}

export type {  Directions }
export default getDirections