/**
 * @description
 * Centralizamos todo lo que tiene que ver con los breakpoints y sus tamaños en este archivo.
 * Esto permitirá que otro desarrollador agregue breakpoints de forma dinámica y que estos afecten a todos los archivos que los utilicen.
 */

const breakpointsSimple = {
    "xs": 440,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "2xl": 1536,

} as const

type BreakpointsList = typeof breakpointsSimple;

interface SizesBreakPoints {
    minWidth: BreakpointsList[keyof BreakpointsList],
    maxWidth: number
}

type BreakPointsKeys = keyof typeof breakpointsSimple

const breakPointsKeys = Object.keys(breakpointsSimple)

const breakPoints = {} as { [K in BreakPointsKeys]: SizesBreakPoints }

for (let i = 0; i < breakPointsKeys.length; i++) {

    const nextBreakPoint = i < (breakPointsKeys.length - 1) ? breakpointsSimple[breakPointsKeys[i + 1]] : 100 * 100

    const key = breakPointsKeys[i]
    breakPoints[key] = {
        minWidth: breakpointsSimple[key],
        maxWidth: nextBreakPoint - 1
    }
}

export { breakPoints, breakPointsKeys }
export type { SizesBreakPoints, BreakPointsKeys}

