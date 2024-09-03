import { useEffect, useState } from "react"
import { BreakPointsKeys } from "../constant/breakpoints.constant"
import { ObserverCallback, useObserverContext } from "@responsive-component/context/Observer.context"
import { BreakPointContext } from "@responsive-component/context/Breakpoint.context"
import { isObject } from "my-utilities"

/**
 * @description 
 * Este hook nos permite sincronizar los breakpoints con el estado de react.
 * La idea de este hook es que por defecto actualiza en todos los casos de los breakpoint accionados,pero podemos personalizar la logica
 * en base a un callback de entrada.
 */

const isEquals = <T extends object | any[]>(object: T, object2: T) => {

    const getHigherLarge = (): { higher: T, lower: T } => {
        if (Array.isArray(object) && Array.isArray(object2)) {
            return {
                higher: object.length > object2.length ? object : object2,
                lower: object2.length < object.length ? object2 : object
            }
        } else if (isObject(object) && isObject(object2)) {
            const keys = Object.keys(object).length
            const keys2 = Object.keys(object2).length
            return {
                higher: keys > keys2 ? object : object2,
                lower: keys2 < keys ? object2 : object
            }
        } else return { higher: object, lower: object2 }
    }

    const { higher, lower } = getHigherLarge()

    if (Array.isArray(higher) && Array.isArray(lower)) {
        return higher.map((i, index) => {
            return lower[index] == i
        }).every(i => Boolean(i))
    }
}

type SyncBreakPointsKeys = BreakPointsKeys
interface ISyncBrakPointCallback {
    current: BreakPointsKeys,
    cache: SyncBreakPointsKeys[]
}

type SyncBreakPointCallback = ({ current, cache }: ISyncBrakPointCallback) => SyncBreakPointsKeys[]

const useSyncBreakPoint = (callback?: SyncBreakPointCallback) => {

    const [notify, setNotify] = useState<SyncBreakPointsKeys[]>([])

    const {tools} = useObserverContext()

    useEffect(() => {
        let cache: SyncBreakPointsKeys[] = []
        if (!tools) return
        const listener: ObserverCallback<BreakPointsKeys> = (e) => {
            if (callback && e) {
                const res = callback({ cache, current: e })
                cache = res
                !isEquals(res, notify) && setNotify(res)
            } else {
                setNotify(e && [e])
                cache = e && [e]
            }
        }
        tools.subscribe(BreakPointContext, listener)
        return () => tools.unsubscribe(BreakPointContext, listener)

    }, [notify])

    return notify

}

export type { SyncBreakPointCallback }

export default useSyncBreakPoint

