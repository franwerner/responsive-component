import { isObject } from "my-utilities"

type DefaultDirections =  ["Top", "Right", "Bottom", "Left"];

type Fn<T extends readonly string[] = DefaultDirections> = (direction: T[number], index: number) => object | undefined;

const defaultDirections: DefaultDirections = ["Top", "Right", "Bottom", "Left"]

const getDirections = <T extends readonly string[] = DefaultDirections>(
    fn: Fn<T>,
    directions?: T
) => {
    return (directions || defaultDirections).reduce((acc, current, index) => {
        const res = fn(current, index);
        if (isObject(res)) return { ...acc, ...res };
        else return acc;
    }, {});
};


export default getDirections

