type NonEmptyObject<T> = T extends {} ? (keyof T extends never ? never : T) : never;



type AdaptedBreakpoints<T> = {
    [K in keyof T]: {
        minWidth: number;
        maxWidth: number;
    }
}



export const createBreakpoints = <T extends { [K in keyof T]: number }>(breakPoints: NonEmptyObject<T>) => {

    let transform = {} as AdaptedBreakpoints<T>

    const breakPointsKeys = Object.keys(breakPoints || {}).sort((a, b) => breakPoints[a] - breakPoints[b])

    for (let i = 0; i < breakPointsKeys.length; i++) {
        const nextBreakPoint = i < (breakPointsKeys.length - 1) ?
            Math.floor(breakPoints[breakPointsKeys[i + 1]] as number) - 0.2 :
            window.screen.width
        // Se resta - 0.2 para que el navegador detecte el cambio de breakponts de manera correcta, es decir EJ: de 1279.8(cuando termina otro breakpoint) a 1280(cunado inicia otro breakpoint.)
        const key = breakPointsKeys[i] as keyof T
        transform[key] = {
            minWidth: Math.floor(breakPoints[key]),
            maxWidth: nextBreakPoint

        }
    }
    return transform
}

export type { AdaptedBreakpoints }
