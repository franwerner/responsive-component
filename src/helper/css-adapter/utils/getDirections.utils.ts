import { isObject } from "my-utilities"
type Directions = "Top" | "Right" | "Bottom" | "Left"
type Fn = (direction: Directions, index: number) => object | undefined

const getDirections = (fn: Fn) => {
    const directions: Directions[] = ["Top", "Right", "Bottom", "Left"]
    return directions.reduce((acc, current, index) => {
        const res = fn(current, index)
        if (isObject(res)) return { ...acc, ...res }
        else return acc
    }, {})
}

export type { Directions }
export default getDirections