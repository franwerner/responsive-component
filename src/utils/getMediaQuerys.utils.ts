import isNumber from "my-utilities/src/utils/isNumber"
import isObject from "my-utilities/src/utils/isObject"
import isString from "my-utilities/src/utils/isString"

type size = number | false

type ViewPortType = { minWidth?: size, maxWidth?: size }

type CustomQuery = `(${string})`

type GetMediaQuery<T extends string> = {
    [key in T]?: ViewPortType | CustomQuery
}

interface MediaQueryListModify extends MediaQueryList {
    name: string
}

interface MediaQueryListEventModify extends MediaQueryListEvent {
    target: MediaQueryListModify,
    currentTarget: MediaQueryListModify
    srcElement: MediaQueryListModify
}

const viewPort = (i: ViewPortType) => {

    const { maxWidth, minWidth } = i

    const queryMin = isNumber(minWidth) && minWidth >= 0 && isFinite(minWidth) ? `(min-width: ${minWidth}px)` : ""
    const queryMax = isNumber(maxWidth) && maxWidth >= 0 && isFinite(maxWidth) ? `(max-width: ${maxWidth}px)` : ""

    const and = queryMin && queryMax ? "and" : ""

    const isMaxLessThanMin = (maxWidth || Infinity) < (minWidth || -Infinity)

    if (!queryMin && !queryMax) {
        return
    } else if (isMaxLessThanMin) {
        return console.warn(`The maximum is less than the minimum`);
    }

    return `${queryMin} ${and} ${queryMax}`
}


const getMediaQuerys = <T extends string>(query: GetMediaQuery<T>) => {

    const mediaQuerys = {} as { [key in T]: MediaQueryListModify }

    for (const key in query) {

        const value = query[key]

        const isCustom = isString(value) ? value : (isObject(value) && viewPort(value))
        const defaultQuery = "(max-width: -1px)" //Sirve para que el matches siempre sea false en caso de que no se aplique nada

        const media = window.matchMedia(isCustom || defaultQuery) as MediaQueryListModify
        media.name = key
        mediaQuerys[key] = media
    }

    return mediaQuerys

}

export type { ViewPortType, GetMediaQuery, MediaQueryListModify, MediaQueryListEventModify }
export default getMediaQuerys
