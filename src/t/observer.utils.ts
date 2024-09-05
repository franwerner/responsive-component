type ObserverCallback<T = any,R = any> = (store: T) => R
type Listeners = Set<ObserverCallback>

interface Observer {
    subscribe: (cb: (store:any) => void) => void
    unsubscribe: (cb: (store:any) => void) => void
    notify: () => void,
    listeners: Listeners
}

const observer = <T,>(listeners: Listeners, store: T): Observer => ({
    subscribe: (cb) => {
        listeners.add(cb)
    },
    unsubscribe: (cb) => {
        listeners.delete(cb)
    },
    notify: () => {
        listeners.forEach(cb => cb(store))
    },
    listeners: listeners
})

export type { Listeners, Observer, ObserverCallback }
export default observer