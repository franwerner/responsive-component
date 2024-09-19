import { motion } from "framer-motion"
import { HTMLResponsiveComponent } from "@/types/responsive.type"
import { useMemo } from "react"

const useCreateMotionComponent = (as: HTMLResponsiveComponent) => {
    return useMemo(() => {
        return motion.create(as as any)
    }, [])
}

export default useCreateMotionComponent