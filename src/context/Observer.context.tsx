import { Context, createContext, FC, MutableRefObject, ReactNode, useContext, useRef } from "react";

type ObserverCallback<T = any> = (value: T) => void;
type ObserverEventKey = string | Context<any>
type ObserverEvents = Map<ObserverEventKey, Set<ObserverCallback>>
interface IObserverContext {
    subscribe: <T> (event: ObserverEventKey, cb: ObserverCallback<T>) => void
    unsubscribe: <T> (event: ObserverEventKey, cb: ObserverCallback<T>) => void
    notify: <T> (event: ObserverEventKey, value: T,) => void,
}

const ObserverContext = createContext<IObserverContext>({
    subscribe: (event: ObserverEventKey, cb) => { },
    unsubscribe: (event: ObserverEventKey, cb) => { },
    notify: (event: ObserverEventKey, value: any) => { }
})

type IEventsContext = MutableRefObject<ObserverEvents>

const EventContext = createContext<IEventsContext>({ current: new Map() })

const useObserverContext = () => useContext(ObserverContext)
const useObserverEventsContext = () => useContext(EventContext)

const ObserverProvider: FC<{ children: ReactNode, events?: ObserverEventKey[] }> = ({ children, events }) => {

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

    const eventsRef = useRef<ObserverEvents>(defaultEvents())

    const observer: IObserverContext = {
            subscribe: (event, cb) => {
                getListener(event)?.add(cb)
            },
            unsubscribe: (event, cb) => {
                getListener(event)?.delete(cb)
            },
            notify: (event, value) => {
                console.log(eventsRef.current.get(event))
                getListener(event)?.forEach(cb => cb(value))
            }
    }

    const getListener = (event: ObserverEventKey) => {
        return eventsRef.current.get(event)
    }

    return (
        <EventContext.Provider value={eventsRef}>
            <ObserverContext.Provider value={observer}>
                {children}
            </ObserverContext.Provider>
        </EventContext.Provider>
    )
}

export { useObserverContext, useObserverEventsContext };
export type { ObserverCallback, ObserverEventKey, ObserverEvents };
export default ObserverProvider