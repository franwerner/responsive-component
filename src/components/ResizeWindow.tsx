import { store, useSelector } from "@responsive-component/context/BreakPointsTheme.context";
import { motion } from "framer-motion";
import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const caclScale = (currentWidth: number) => {
    const innerWidth = window.innerWidth
    const resize = innerWidth - currentWidth
    const isOutside = resize < 0

    if (!isOutside) return 1
    return (innerWidth / currentWidth)
    //Calcula cuanto puede entrar el breakpointWidth en el tamaño actual de la pantalla.
    //este calculo dara un porcentaje menor a 1, lo que equivale a hacerse mas pequeño en la propiedad scale.
}


const ResizeWindow: FC<{ children: ReactNode, automatic: boolean }> = ({ children, automatic = false }) => {

    const breakpointList = store["breakpoints"]["list"]
    const [resize, setResize] = useState<keyof typeof breakpointList>()
    const lastestBreakPoint = useSelector((store) => store.breakpoints.currentBreakPoint)

    useEffect(() => {
        if (!lastestBreakPoint || !automatic) return
        const entriesBreakPoint = Object.entries(breakpointList).reverse()
        const listener = (event: Event) => {
            const target = event.target
            if (target instanceof Window) {
                const innerWidth = target.innerWidth
                const findBreakpointForWidth = entriesBreakPoint.find(([_, value]) => value.minWidth <= target.innerWidth) ?? [undefined]
                if (innerWidth && findBreakpointForWidth[0] !== resize)
                    setResize(findBreakpointForWidth[0])
            }
        };

        window.addEventListener("resize", listener)
        return () => {
            window.removeEventListener("resize", listener)
        }
    }, [automatic, lastestBreakPoint, resize])

    const currentWidth = lastestBreakPoint ? breakpointList[lastestBreakPoint]?.minWidth : window.innerWidth

    const scale = caclScale(currentWidth)
    const width = !lastestBreakPoint || scale !== 1 ? "100%" : currentWidth

    return (
        <motion.div
            id="resizeWindow"
            style={{
                border: `${lastestBreakPoint ? "4" : "0"}px solid #fe6e8b`,
                overflow: "hidden",
                backgroundColor: lastestBreakPoint ? "#ffe3e7" : "white",
                transformOrigin: `50% 50%`,
                height: "100%",
                margin: "0 auto",
                position: "relative"
            }}
            animate={{
                width: width,
                scale: automatic ? scale : 1,
            }}>
            {children}
        </motion.div>
    );
}

const createPortalInResizeWindow = (Component: ReactNode) => {
    return createPortal(
        Component
        , document.querySelector("#resizeWindow") ?? document.body
    )
}


export { createPortalInResizeWindow };
export default ResizeWindow
