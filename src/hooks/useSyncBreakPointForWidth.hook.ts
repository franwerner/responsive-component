import { breakPoints, BreakPointsKeys } from "@responsive-component/constant/breakpoints.constant"
import { BreakPointContext } from "@responsive-component/context/Breakpoint.context"
import { ObserverCallback, useObserverContext } from "@responsive-component/context/Observer.context"
import { calculateBreakPointsForWidth, ICalculateBreakPoints } from "@responsive-component/utils/calculateBreakPoints.utils"
import { useEffect, useState } from "react"

const useSyncBreakPointForWidth = (args: ICalculateBreakPoints) => {

    const [notify, setNotify] = useState<BreakPointsKeys[] | undefined>()

    const observer = useObserverContext()

    useEffect(() => {
        const listener: ObserverCallback<BreakPointsKeys | undefined> = (e) => {
            const width = e ? breakPoints[e].maxWidth : 0
            const res = Object.keys(calculateBreakPointsForWidth({ ...args, width }))
            if(res.length == 0 || !e) return setNotify(undefined)
            else if(JSON.stringify(res) !== JSON.stringify(notify)) setNotify(res)
        }
        observer.subscribe(BreakPointContext, listener)
        return () => {
            observer.unsubscribe(BreakPointContext, listener)
        }
    }, [notify, JSON.stringify(args)])

    return notify

}

export default useSyncBreakPointForWidth
