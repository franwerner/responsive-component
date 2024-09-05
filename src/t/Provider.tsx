import { Context, ReactNode, useMemo, useRef } from "react";
import observer, { Listeners, Observer } from "./observer.utils";

type ContextStore<T> = { observer: Observer } & { store: T }

interface Provider<T> {
    children: ReactNode
    value: T
    context: Context<ContextStore<T>>
}

const Provider= <T,>({ children, context, value }: Provider<T>) => {

    const ref = useRef<{ store: T, listeners: Listeners }>({
        store: value,
        listeners: new Set()
    })

    const providerValue = useMemo(() => ({
        store: ref.current.store,
        observer: observer(ref.current.listeners, ref.current.store)
    }), [])

    return (
        <context.Provider value={providerValue}>
            <p>fdf123</p>
            {children}
        </context.Provider>
    );
};

export type { ContextStore }
export default Provider