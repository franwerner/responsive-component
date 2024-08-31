import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { breakPoints } from "../constant/breakpoints.constant";
import breakPointObserver from "../utils/breakPointObserver.utils";
import useSynchronizeBreakPoint from "../hooks/useSyncBreakPoint";

interface IBreakPointsControls {
    children?: ReactNode
}
const list = Object.keys(breakPoints)


const BreakPointsControls: FC<IBreakPointsControls> = ({ children }) => {

    const lastestBreakPoint = useSynchronizeBreakPoint()
    
    return (
        <div style={{ background: "white" }}>
            {list.map(i =>
                <motion.button
                    onClick={() => breakPointObserver.notify(i)}
                    animate={{
                        scale: 0.7,
                        padding: "20px",
                        backgroundColor: lastestBreakPoint === i ? "#FF0000" : "#362A89",
                        y: lastestBreakPoint === i ? [0, 10, 10, 0] : 0,
                        border: "1px solid #FFF",
                        borderRadius: "20px",
                        margin: "2px",
                        color: "#FFF",
                        textTransform: "uppercase"
                    }}
                    key={i}>
                    {i}
                </motion.button>
            )}
            {children}
        </div>
    )
};


export default BreakPointsControls