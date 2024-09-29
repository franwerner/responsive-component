import { AnimatableOnly } from "@/types/animate.type"


const animableKeys: (keyof AnimatableOnly)[] = [
    "whileHover",
    "whileDrag",
    "whileTap",
    "whileFocus",
    "whileInView",
    "initial"
    , "animate"
]

export default animableKeys