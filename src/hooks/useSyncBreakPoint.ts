import { Dispatch, SetStateAction, useEffect, useState } from "react"
import breakPointObserver, { BreakPointListener } from "../utils/breakPointObserver.utils"
import { BreakPointsKeys } from "../constant/breakpoints.constant"

/**
 * @description 
 * Este hook nos permite sincronizar los breakpoints con el estado de react.
 * La idea de este hook es que por defecto actualiza en todos los casos de los breakpoint accionados,pero podemos personalizar la logica
 * en base a un callback de entrada.
 */

type SyncBreakPointsKeys = BreakPointsKeys | false
interface ISyncBrakPointCallback {
    current: BreakPointsKeys,
    setNotify: Dispatch<SetStateAction<SyncBreakPointsKeys>>
    cache: SyncBreakPointsKeys
}

type SyncBreakPointCallback = ({ current, setNotify, cache }: ISyncBrakPointCallback) => void

const useSyncBreakPoint = (callback?: SyncBreakPointCallback) => {

    const [notify, setNotify] = useState<SyncBreakPointsKeys>(false)

    useEffect(() => {
        let cache: SyncBreakPointsKeys = false
        const listener: BreakPointListener = (e) => {
            if (callback && e) {
                callback({ cache, current: e, setNotify })
            } else {
                setNotify(e)
            }
            cache = e
        }
        breakPointObserver.subscribe(listener)
        return () => breakPointObserver.unsubscribe(listener)

    }, [])

    return notify

}

export type {SyncBreakPointCallback}

export default useSyncBreakPoint