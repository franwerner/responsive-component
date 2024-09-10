
import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { breakPointsKeys } from "../constant/breakpoints.constant";
import ResizeWindow from "./ResizeWindow";
import { useDispatch, useSelector } from "@responsive-component/context/BreakPointsTheme.context";

interface IBreakPointsControls {
    children?: ReactNode
}


const BreakPointsControls: FC<IBreakPointsControls> = ({ children }) => {
    const lastestBreakPoint = useSelector((store) => store.breakpoints.currentBreakPoint)
    const dispatch = useDispatch({ state: "breakpoints", action: "setBreakPoint" })

    return (
        <div
            id="breakpoint-controls"
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
            }}>
            <div style={{ zIndex: 99999 }}>
                {breakPointsKeys.map(i =>
                    <motion.button
                        onClick={() => {
                            dispatch(prev => prev.currentBreakPoint == i ? undefined : i)
                        }}
                        animate={{
                            scale: 0.7,
                            padding: "20px",
                            backgroundColor: lastestBreakPoint === i ? "#FF0000" : "#362A89",
                            y: lastestBreakPoint === i ? [0, 10, 10, 0] : 0,
                            borderRadius: "20px",
                            margin: "2px",
                            color: "#FFF",
                            textTransform: "uppercase"
                        }}
                        key={i}>
                        {i}
                    </motion.button>
                )}
            </div>
            <ResizeWindow automatic>
                {children}
            </ResizeWindow>
        </div>
    )
};


export default BreakPointsControls