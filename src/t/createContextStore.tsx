import { Context, createContext, ReactNode } from "react";
import Provider, { ContextStore } from "./Provider";
import observer from "./observer.utils";

const createDynamicContext = <T,>(contextValue: T) => {
    return createContext<ContextStore<T>>({
        observer: observer(new Set(), {}),
        store: contextValue
    })
}

type ActionCallback<T = any, U = any> = (store: T, payload: U) => void

type Actions<T, U> = {
    [K in keyof U]: ActionCallback<T, U[K]>
}

type ReturnTypeContextStore<T, U> = [
    (props: { children: ReactNode }) => JSX.Element,
    Context<ContextStore<T>>,
    Actions<T, U>
];

const createContextStore = <T, U>(contextValue: T, actions: Actions<T, U>) => {
    const immutable = structuredClone(contextValue);
    const context = createDynamicContext(contextValue);

    const res: ReturnTypeContextStore<T, U> = [
        (props) => <Provider {...props} context={context} value={immutable} />,
        context,
        actions
    ];

    return res;
};

export type { Actions, ActionCallback }
export default createContextStore