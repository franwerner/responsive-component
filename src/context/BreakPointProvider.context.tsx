import { BreakPointsKeys } from "@responsive-component/constant/breakpoints.constant";
import { FC, ReactNode } from "react";
import { ActionCallback, createContextStore, ObserverCallback, useDispatch, useSelector } from "react-observer-context";

type BreakPointStore = {
    breakPoint?: BreakPointsKeys,
}

const breakPointStore: BreakPointStore = {
    breakPoint: undefined,
}

const { Provider, actions: breakPointActions, context: breakPointContext } = createContextStore(breakPointStore, {
    setBreakPoint: (store, payload?: BreakPointsKeys) => {
        store.breakPoint = payload
    }
})


const BreakPointProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Provider>
            {children}
        </Provider>
    );
};

const useSelectorBreakPoint = <R,>(callback: ObserverCallback<BreakPointStore, R>) => {
    return useSelector(breakPointContext, callback)
}
const useDispatchBreakPoint = <R,>(callback: ActionCallback<BreakPointStore, R>) => {
    return useDispatch(breakPointContext, callback)
}

export type { BreakPointStore }
export { breakPointActions, breakPointContext, useSelectorBreakPoint, useDispatchBreakPoint };
export default BreakPointProvider