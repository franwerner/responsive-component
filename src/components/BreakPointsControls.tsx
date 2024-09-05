import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { breakPointsKeys } from "../constant/breakpoints.constant";
import { useDispatch, useSelector } from "react-observer-context";
import { breakPointContext, breakPointActions } from "@responsive-component/context/BreakPointProvider.context";


interface IBreakPointsControls {
    children?: ReactNode
}

const BreakPointsControls: FC<IBreakPointsControls> = ({ children }) => {

    const lastestBreakPoint = useSelector(breakPointContext, (store) => store.breakPoint)
    const dispatch = useDispatch(breakPointContext, breakPointActions.setBreakPoint)

    return (
        <div style={{ background: "white" }}>
            {breakPointsKeys.map(i =>
                <motion.button
                    onClick={() => dispatch(i)}
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