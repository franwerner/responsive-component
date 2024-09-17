import { Breakpoints } from "@/types/breakpoint.types"

type TransformBreakPoints = {
    minWidth: number,
    maxWidth: number
}

const transformBreakPoints = (breakPoints: { [K in Breakpoints]: number }) => {

    let transform = {} as { [K in Breakpoints]: TransformBreakPoints }
    const breakPointsKeys = Object.keys(breakPoints)

    for (let i = 0; i < breakPointsKeys.length - 1; i++) {
        const nextBreakPoint = i < (breakPointsKeys.length - 1) ? breakPoints[breakPointsKeys[i + 1]] as number : window.screen.width

        const key = breakPointsKeys[i]
        transform[key] = {
            minWidth: breakPoints[key],
            maxWidth: nextBreakPoint - 1
        }
    }

    return transform

}

export type { TransformBreakPoints }
export default transformBreakPoints