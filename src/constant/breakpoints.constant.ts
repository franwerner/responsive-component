import transformBreakPoints from "@/utils/transformBreakPoints.utils"

type Breakpoints = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

const breakPointDefault = {
    "xs": 440,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "2xl": 1536,
}


let breakpoints = transformBreakPoints(breakPointDefault)

type Cb<T extends { [K in Breakpoints]: number }> = (_default: typeof breakPointDefault) => T

const createBreakPoints = <T extends { [K in Breakpoints]: number }>(cb: Cb<T>) => {
    const res = cb(breakPointDefault)
    breakpoints = transformBreakPoints(res)
}

export { type Breakpoints, breakpoints, createBreakPoints, breakPointDefault }