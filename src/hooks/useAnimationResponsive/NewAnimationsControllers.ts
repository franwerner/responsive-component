import { AnimationPlaybackControls } from "framer-motion"
import { AnimateProps } from "@responsive-component/types"
import { IRefAnimationControls } from "./useAnimateResponsive.hook"

interface INewAnimationsControllers {
    current: IRefAnimationControls["current"]
    controlsHandler: (value?: AnimateProps) => AnimationPlaybackControls
}

interface IReturnNewAnimationsControllers extends INewAnimationsControllers {
    play: () => Promise<void> | void
    cancel: () => Promise<void> | void
    complete: () => void,
    restart: () => Promise<void> | void,
    pause: () => void

}

type KeysAnimationState = IRefAnimationControls["current"]["animationState"][]

class NewAnimationsControllers implements IReturnNewAnimationsControllers {
    controlsHandler: (value?: AnimateProps) => AnimationPlaybackControls
    current: IRefAnimationControls["current"]

    constructor({ current, controlsHandler }: INewAnimationsControllers) {
        this.controlsHandler = controlsHandler
        this.current = current
    }

    play() {
        const noAllowed: KeysAnimationState = ["restart", "cancel", "complete", "play"]

        if (noAllowed.includes(this.current.animationState)) return
        return new Promise<void>((resolve) => {
            this.current.animationState = "play"
            this.controlsHandler().then(() => resolve())
        })
    }

    cancel() {
        const noAllowed: KeysAnimationState = ["initial", "cancel"]

        if (noAllowed.includes(this.current.animationState)) return
        return new Promise<void>((resolve) => {
            this.current.animationState = "cancel"
            this.controlsHandler().then(() => {
                this.current.animationState = "initial"
                resolve()
            })
        })
    }

    complete() {
        const noAllowed: KeysAnimationState = ["complete", "cancel", "restart"]
        if (noAllowed.includes(this.current.animationState)) return
        this.current.animationState = "complete"
        this.controlsHandler().complete()
    }

    restart() {
        const noAllowed: KeysAnimationState = ["initial", "restart", "cancel"]

        if (noAllowed.includes(this.current.animationState)) return
        return new Promise<void>((resolve) => {
            this.current.animationState = "restart"
            this.controlsHandler().then(async () => {
                if (this.current.animationState == "restart") {
                    this.current.animationState = "initial"
                    await this.play()
                }
                resolve()
            })
        })
    }

    pause() {
        if (this.current.animationState !== "play") return
        this.current.animationState = "pause"
        this.controlsHandler().pause()
    }


}

export { type IReturnNewAnimationsControllers }
export default NewAnimationsControllers