type NonEmptyObject<T> = T extends {} ? (keyof T extends never ? never : T) : never;

type AdaptedBreakpoints<T> = {
    [K in keyof T]: {
        minWidth: number;
        maxWidth: number;
    }
}

export const createBreakpoints = <T extends { [K in keyof T]: number }>(breakPoints: NonEmptyObject<T>) => {

    let transform = {} as AdaptedBreakpoints<T>

    const breakPointsKeys = Object.keys(breakPoints || {})

    for (let i = 0; i < breakPointsKeys.length; i++) {
        const nextBreakPoint = i < (breakPointsKeys.length - 1) ? breakPoints[breakPointsKeys[i + 1]] as number : window.screen.width

        const key = breakPointsKeys[i] as keyof T
        transform[key] = {
            minWidth: breakPoints[key],
            maxWidth: nextBreakPoint - 1

        }
    }
    return transform
}

export type { AdaptedBreakpoints }
