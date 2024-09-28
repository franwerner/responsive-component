import { AdaptedBreakpoints, createBreakpoints } from "@/utils/createBreakpoints.utils"

const breakPointDefault = createBreakpoints({
    "lg": 1024,
    "xs": 440,
    "sm": 640,
    "md": 768,
    "2xl": 1536,
    "xl": 1280,
})

type AdaptedDefault = AdaptedBreakpoints<typeof breakPointDefault>

export {
    breakPointDefault,
    type AdaptedDefault
}
