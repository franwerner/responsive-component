import { breakPoints, BreakPointsKeys } from "@responsive-component/constant/breakpoints.constant";
import { createContextStore } from "react-observer-context";


//Redifinir aca la estructura de los breakpoints.

type BreakPointStore = {
    currentBreakPoint?: BreakPointsKeys,
    list: typeof breakPoints
}

const breakPointStore: BreakPointStore = {
    list: breakPoints,
    currentBreakPoint: undefined
}


const BreakPointsTheme = createContextStore(
    {
        breakpoints: breakPointStore
    },
    {
        breakpoints: {
            setBreakPoint: (state, payload?: BreakPointsKeys) => {
                state.currentBreakPoint = payload
            },
        }
    }
)

export const { Provider: BreakPointProvider, useDispatch, extendStore, useSelector, store } = BreakPointsTheme
export default BreakPointsTheme


