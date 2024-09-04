import { useEffect, useState } from "react"
import { ObserverCallback, useObserverContext } from "../Observer.context"
import { BreakPointContext } from "@responsive-component/context/Breakpoint.context"

type ObserverValue = any

type UseObserverCallback<T = ObserverValue> = (e: T ) => boolean

const useObsever = <T = ObserverValue>(callback?: UseObserverCallback) => {

    const [notify, setNotify] = useState<T>()

    const observer = useObserverContext()

    useEffect(() => {
        const listener: ObserverCallback<T> = (e) => {
            if (callback) {
                const res = callback(e)
                res !== notify && setNotify(e)
            } else {
                setNotify(e)
            }
        }
        observer.subscribe(BreakPointContext, listener)
        return () => observer.unsubscribe(BreakPointContext, listener)
    }, [notify])

    return notify

}

export type { ObserverValue, ObserverCallback }

export default useObsever

