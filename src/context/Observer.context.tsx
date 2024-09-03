import { listeners } from "process";
import { Context, createContext, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useRef } from "react";

export type ObserverCallback<T = any> = (value: T) => void;
export type ObserverEvent = string | Context<any>


interface IObserverContext {
    subscribe: <T> (event: ObserverEvent, cb: ObserverCallback<T>) => void
    unsubscribe: <T> (event: ObserverEvent, cb: ObserverCallback<T>) => void
    notify: <T> (event: ObserverEvent, value: T,) => void,
}

const ObserverContext = createContext<{
    listeners: Map<ObserverEvent, Set<ObserverCallback>>,
    tools: IObserverContext
}>({
    listeners: new Map(),
    tools: {
        subscribe: (event: ObserverEvent, cb) => { },
        unsubscribe: (event: ObserverEvent, cb) => { },
        notify: (event: ObserverEvent, value: any) => { }
    }
})

const EventContext = createContext((event: ObserverEvent) => { })

const useCreateObserverEvent = (event: ObserverEvent) => {
    const setEvent = useContext(EventContext)
    useEffect(() => {
        setEvent(event)
    }, [event])
}

const useObserverContext = () => useContext(ObserverContext)

const ObserverProvider: FC<{ children: ReactNode, events?: ObserverEvent[] }> = ({ children, events }) => {

    const defaultEvents = () => {
        if (events) {
            const callbacks: Set<ObserverCallback> = new Set()
            return new Map(
                events.map(i => [i, callbacks])
            )
        } else {
            return new Map()
        }

    }

    const listeners = useRef<{
        listeners: Map<ObserverEvent, Set<ObserverCallback>>,
        tools: IObserverContext
    }>({
        listeners: defaultEvents(),
        tools: {
            subscribe: (event, cb) => {
                const t = listeners.current;
                console.log(t)
                t.listeners.get(event)?.add(cb)
            },
            unsubscribe: (event, cb) => {
                const t = listeners.current;
                t.listeners.get(event)?.delete(cb)
            },
            notify: (event, value) => {
                const t = listeners.current;
                t.listeners.get(event)?.forEach(cb => cb(value))
            }
        }
    })


    const addEvent = useCallback((event: ObserverEvent) => {

        if (!listeners.current.listeners.has(event)) {
            listeners.current.listeners.set(event, new Set<ObserverCallback>([]))
        }
    }, [])

    const getListener = (event: ObserverEvent) => {
        const t = listeners.current.listeners
        return t.get(event)
    }


    return (
        <EventContext.Provider value={addEvent}>
            <ObserverContext.Provider value={listeners.current}>
                {children}
            </ObserverContext.Provider>
        </EventContext.Provider>
    )
}

export { useCreateObserverEvent, useObserverContext };
export default ObserverProvider