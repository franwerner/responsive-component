import { useEffect, useState } from "react"
import { BreakPointsKeys } from "../constant/breakpoints.constant"
import { ObserverCallback, useObserverContext } from "@responsive-component/context/Observer.context"
import { BreakPointContext } from "@responsive-component/context/Breakpoint.context"


/**
 * @description 
 * Este hook nos permite sincronizar los breakpoints con el estado de react.
 * La idea de este hook es que por defecto actualiza en todos los casos de los breakpoint accionados,pero podemos personalizar la logica
 * en base a un callback de entrada.
 */

type SyncBreakPoints = undefined | BreakPointsKeys

type SyncBreakPointCallback = (e: SyncBreakPoints, last: SyncBreakPoints) => SyncBreakPoints | undefined

const useSyncBreakPoint = (callback?: SyncBreakPointCallback) => {

    const [notify, setNotify] = useState<SyncBreakPoints>()

    const  observer = useObserverContext()

    useEffect(() => {
        const listener: ObserverCallback<SyncBreakPoints> = (e) => {
            if (callback) {
                const res = callback(e, notify)
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

export type { SyncBreakPointCallback, SyncBreakPoints }

export default useSyncBreakPoint

