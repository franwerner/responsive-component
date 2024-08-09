import { BreakPointsKeys } from "../constant/breakpoints.constant"

type BreakPointsKeysExtend = BreakPointsKeys

type Listeners = Set<Function>

type BreakPointListener = (breakpoint: BreakPointsKeys | false) => void
interface IBreakPointObserver {
    subscribe: (callback: BreakPointListener) => void
    unsubscribe: (callback: BreakPointListener) => void
    notify: (breakpoint: BreakPointsKeys) => void
}

class BreakPointObserver implements IBreakPointObserver {

    private listeners: Listeners
    private lastestBreakPoint?: BreakPointsKeysExtend

    constructor() {
        this.listeners = new Set()
        this.lastestBreakPoint = undefined
    }

    subscribe(callback: BreakPointListener) {
        this.listeners.add(callback)
    }

    unsubscribe(callback: BreakPointListener) {
        this.listeners.delete(callback)
    }

    notify(breakpoint: BreakPointsKeys) {

        const isEqual = this.lastestBreakPoint == breakpoint

        this.listeners.forEach(i => isEqual ? i(false) : i(breakpoint))

        this.lastestBreakPoint = isEqual ? undefined : breakpoint
    }

}

export type { IBreakPointObserver, BreakPointListener }
export default new BreakPointObserver()