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
            console.log(e)
            const width = e ? breakPoints[e].maxWidth : 0
            const res = Object.keys(calculateBreakPointsForWidth({ ...args, width }))
            JSON.stringify(res) !== JSON.stringify(notify) && setNotify(res)
        }
        observer.subscribe(BreakPointContext, listener)
        return observer.unsubscribe(BreakPointContext, listener)
    }, [notify,JSON.stringify(args)])

    return notify

}


export default useSyncBreakPointForWidth






// const isEquals = <T extends object | any[]>(object: T, object2: T) => {

//     const getHigherLarge = (): { higher: T, lower: T } => {
//         if (Array.isArray(object) && Array.isArray(object2)) {
//             return {
//                 higher: object.length > object2.length ? object : object2,
//                 lower: object2.length < object.length ? object2 : object
//             }
//         } else if (isObject(object) && isObject(object2)) {
//             const keys = Object.keys(object).length
//             const keys2 = Object.keys(object2).length
//             return {
//                 higher: keys > keys2 ? object : object2,
//                 lower: keys2 < keys ? object2 : object
//             }
//         } else return { higher: object, lower: object2 }
//     }

//     const { higher, lower } = getHigherLarge()

//     if (Array.isArray(higher) && Array.isArray(lower)) {
//         return higher.map((i, index) => {
//             return lower[index] == i
//         }).every(i => Boolean(i))
//     }
// }