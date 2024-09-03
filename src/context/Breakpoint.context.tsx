import { createContext, FC, useContext, useEffect, useState } from "react";
import { BreakPointsKeys } from "../constant/breakpoints.constant";
import { useCreateObserverEvent, useObserverContext } from "./Observer.context";

interface breakPointContext {
    lastestBreakPoint?: BreakPointsKeys,
    updateBreakPoint: (nextBreakPoint: BreakPointsKeys) => void
}

const BreakPointContext = createContext<breakPointContext>({
    lastestBreakPoint: undefined,
    updateBreakPoint: () => { }
})

const useGetBreakPointContext = () => useContext(BreakPointContext)

const BreakpointProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

    useCreateObserverEvent(BreakPointContext)

    const [breakpoint, setBreakPoint] = useState<BreakPointsKeys | undefined>()

    const updateBreakPoint = (nextBreakPoint: BreakPointsKeys) => setBreakPoint(prev => nextBreakPoint === prev ? undefined : nextBreakPoint)

    const {tools} = useObserverContext()

    useEffect(() => {
        if (tools) {
            tools.notify(BreakPointContext, breakpoint)
        }
    }, [breakpoint])

    return (
        <BreakPointContext.Provider
            value={{
                updateBreakPoint: updateBreakPoint,
                lastestBreakPoint: breakpoint
            }}
        >
            {children}
        </BreakPointContext.Provider>
    );
};
export default BreakpointProvider

export { BreakPointContext, useGetBreakPointContext };

