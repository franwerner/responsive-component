import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useRef } from "react";

/**
 * @description
 * 1- Este observer esta diseñado para que solo tengamos una @instancia en toda nuestra APP.
 */

type ObserverCallback<T = any> = (value: T) => void;
type ObserverEventKey = any
type ObserverEvents = Map<ObserverEventKey, Set<ObserverCallback>>
type ObserverPedingListener = Map<ObserverCallback, ObserverEventKey>
interface IObserverContext {
    subscribe: <T> (event: ObserverEventKey, cb: ObserverCallback<T>) => void
    unsubscribe: <T> (event: ObserverEventKey, cb: ObserverCallback<T>) => void
    notify: <T> (event: ObserverEventKey, value: T,) => void,
}

const ObserverContext = createContext<IObserverContext>({
    subscribe: () => { },
    unsubscribe: () => { },
    notify: () => { }
})

type IEventsContext = {
    events: ObserverEvents,
    addEvent: (event: ObserverEventKey) => void
    clearEvent: (event: ObserverEventKey) => void
}

const EventContext = createContext<IEventsContext>({
    events: new Map(),
    addEvent: () => { },
    clearEvent: () => { }
})

const useObserverContext = () => useContext(ObserverContext)
const useObserverEventsContext = () => useContext(EventContext)
const useCreateEvent = (event: ObserverEventKey) => {
    const { addEvent, clearEvent } = useObserverEventsContext()
    useEffect(() => {
        addEvent(event)
        return () => clearEvent(event)
    }, [])
}

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
    const eventsRef = useRef<{
        events: ObserverEvents,
        pendingListeners: ObserverPedingListener
    }>({
        events: defaultEvents(),
        pendingListeners: new Map()
    })

    const getListener = (event: ObserverEventKey) => eventsRef.current.events.get(event)

    const setPedingListener = (event: ObserverEvents, cb: ObserverCallback) => {
        eventsRef.current.pendingListeners.set(cb, event)
    }

    const observerProps: IObserverContext = useMemo(() => ({
        subscribe: (event, cb) => {
            const get = getListener(event)
            if (get) {
                get.add(cb)
            } else {
                setPedingListener(event, cb)
            }
        },
        unsubscribe: (event, cb) => {
            getListener(event)?.delete(cb)
        },
        notify: (event, value) => {
            getListener(event)?.forEach(cb => cb(value))
        },
    }), [])

    const eventProps: IEventsContext = useMemo(() => ({
        events: eventsRef.current.events,
        addEvent: (event: ObserverEventKey) => {
            const callbacks: Set<ObserverCallback> = new Set()
            if (eventsRef.current.events.has(event)) return
            eventsRef.current.events.set(event, callbacks)
            eventsRef.current.pendingListeners.forEach((event, cb) => {
                observerProps.subscribe(event, cb)
                eventsRef.current.pendingListeners.delete(cb)
            })
        },
        clearEvent: (event: ObserverEventKey) => {
            eventsRef.current.events.delete(event)
        }
    }), [])


    return (
        <EventContext.Provider value={eventProps}>
            <ObserverContext.Provider value={observerProps}>
                {children}
            </ObserverContext.Provider>
        </EventContext.Provider>
    )
}

export { useObserverContext, useObserverEventsContext, useCreateEvent };
export type { ObserverCallback, ObserverEventKey, ObserverEvents };
export default ObserverProvider