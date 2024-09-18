

type AdaptedBreakpoints<T> = {
    [K in keyof T]: {
        minWidth: number;
        maxWidth: number;
    }
}

export const createBreakpoints = <T extends {[K in keyof T] : number}>(breakPoints: T) => {

    let transform = {} as AdaptedBreakpoints<T>

    const breakPointsKeys = Object.keys(breakPoints) 

    for (let i = 0; i < breakPointsKeys.length; i++) {
        const nextBreakPoint = i < (breakPointsKeys.length - 1) ? breakPoints[breakPointsKeys[i + 1]] as number : window.screen.width

        const key = breakPointsKeys[i]
        transform[key] = {
            minWidth: breakPoints[key],
            maxWidth: nextBreakPoint - 1

        }
    }
    return transform
}

export type {AdaptedBreakpoints}
