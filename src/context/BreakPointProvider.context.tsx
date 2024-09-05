import { BreakPointsKeys } from "@responsive-component/constant/breakpoints.constant";
import { FC, ReactNode } from "react";
import { createContextStore } from "react-observer-context";

type Store = {
    breakPoint?: BreakPointsKeys,
}

const breakPointStore: Store = {
    breakPoint: undefined,
}

const { Provider, actions: breakPointActions, context: breakPointContext } = createContextStore(breakPointStore, {
    setBreakPoint: (store, payload: BreakPointsKeys) => {
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

export { breakPointActions, breakPointContext };
export default BreakPointProvider