import { createContext, FC, useContext, useEffect, useState } from "react";
import { BreakPointsKeys } from "../constant/breakpoints.constant";
import { useObserverContext } from "./Observer.context";

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

    const [breakpoint, setBreakPoint] = useState<BreakPointsKeys | undefined>()

    const updateBreakPoint = (nextBreakPoint: BreakPointsKeys) => setBreakPoint(prev => nextBreakPoint === prev ? undefined : nextBreakPoint)

    const observer = useObserverContext()

    useEffect(() => {
        observer.notify(BreakPointContext, breakpoint)
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

