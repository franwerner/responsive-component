import { breakPointActions, useDispatchBreakPoint, useSelectorBreakPoint } from "@responsive-component/context/BreakPointProvider.context";
import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { breakPointsKeys } from "../constant/breakpoints.constant";


interface IBreakPointsControls {
    children?: ReactNode
}

const BreakPointsControls: FC<IBreakPointsControls> = ({ children }) => {

    const lastestBreakPoint = useSelectorBreakPoint((store) => store.breakPoint )
    const dispatch = useDispatchBreakPoint(breakPointActions.setBreakPoint)

    return (
        <div style={{ background: "white" }}>
            {breakPointsKeys.map(i =>
                <motion.button
                    onClick={() => dispatch(prev => prev.breakPoint == i ? undefined : i)}
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