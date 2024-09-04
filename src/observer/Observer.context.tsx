import { createContext, FC, ReactNode, useContext, useMemo, useRef } from "react";

/**
 * @description
 * 1- Este observer esta diseñado para que solo tengamos una @instancia en toda nuestra APP.
 */

type ObserverCallback<T = any> = (value: T) => void;
type ObserverEventKey = any
type ObserverEvents = Map<ObserverEventKey, Set<ObserverCallback>>
interface IObserverContext {
    subscribe: <T> (event: ObserverEventKey, cb: ObserverCallback<T>) => void
    unsubscribe: <T> (event: ObserverEventKey, cb: ObserverCallback<T>) => void
    notify: <T> (event: ObserverEventKey, value: T,) => void,
    events : ObserverEvents
}

const ObserverContext = createContext<IObserverContext>({
    subscribe: () => { },
    unsubscribe: () => { },
    notify: () => { },
    events : new Map()
})

const useObserverContext = () => useContext(ObserverContext)

const ObserverProvider: FC<{ children: ReactNode, events?: ObserverEventKey[] }> = ({ children, events }) => {

    const defaultEvents = () => {
        if (events) {
            const callbacks = (): Set<ObserverCallback> => new Set()
            return new Map(
                events.map(i => [i, callbacks()])
            )
        } else {
            return new Map()
        }
    }
    const eventsRef = useRef<ObserverEvents>(defaultEvents())

    const getListener = (event: ObserverEventKey) => eventsRef.current.get(event)

    const observerProps: IObserverContext = useMemo(() => ({
        subscribe: (event, cb) => {
            const get = getListener(event)
            get?.add(cb)
        },
        unsubscribe: (event, cb) => {
            getListener(event)?.delete(cb)
        },
        notify: (event, value) => {
            getListener(event)?.forEach(cb => cb(value))
        },
        events : eventsRef.current
    }), [])

    return (
        <ObserverContext.Provider value={observerProps}>
            {children}
        </ObserverContext.Provider>
    )
}

export { useObserverContext };
export type { ObserverCallback, ObserverEventKey, ObserverEvents };
export default ObserverProvider