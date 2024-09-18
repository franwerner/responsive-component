import { createDomMotionComponent } from "framer-motion";
import { useEffect, useImperativeHandle, useMemo, useRef, } from "react";
import NewAnimationsControllers, { IReturnNewAnimationsControllers } from "../hooks/useAnimationResponsive/NewAnimationsControllers";
import { AllProps, HTMLMotionComponents, LiteProps } from "@/types/responsive-component.types";
import useAnimationLayer from "@/Layer/UseAnimation.layer";
import useResponsiveLayer from "@/Layer/UseResponsive.layer";


const useCreateMotionComponent = (as: HTMLMotionComponents) => {
    return useMemo(() => {
        return createDomMotionComponent<any>(as);
    }, [as]);
}

const ResponsiveComponentControls =
    <T extends HTMLMotionComponents = "div",U = {}>(
        { as = 'div' as T, controls, _REF, ...props }: AllProps<T,U> & { controls: IReturnNewAnimationsControllers }) => {

        const localRef = useRef<HTMLElement>()

        const { animate = {}, transition = {}, lastestBreakPoint, style, ...responsiveProps } = useResponsiveLayer(props)

        useImperativeHandle(_REF, () => {
            return {
                localRef: localRef.current,
                transition: transition,
                style: style,
                animate: animate,
            }
        }, [{}])

        useEffect(() => {
            if (!(controls instanceof NewAnimationsControllers)) return console.error(new Error("Controls is not a function,enter an instance of the useAnimateResponsive controls"))

            const animationState = controls.current.animationState

            if (animationState === "play") {
                controls.controlsHandler().play()
            } else if (!["play", "restart", "pause"].includes(animationState)) {
                controls.controlsHandler().complete()
            }

        }, [lastestBreakPoint])

        const EnhancedComponent = useCreateMotionComponent(as)

        return <EnhancedComponent {...responsiveProps} ref={localRef} />
    }


const ResponsiveComponentLite = //Lo podemos usar para cuando necesitemos la implementacion de resteo de animaciones correctamente.
    <T extends HTMLMotionComponents = "div",U = {}>(
        { as = 'div' as T, _REF, ...props }: LiteProps<T,U>,
    ) => {
        const animatedProps = useAnimationLayer(props as any)

        const EnhancedComponent = useCreateMotionComponent(as)

        return <EnhancedComponent {...animatedProps} ref={_REF} />
    }

const ResponsiveComponentAll =
    <T extends HTMLMotionComponents = "div", U = {}>(
        { as = 'div' as T, _REF, ...props }: AllProps<T, U>) => {

        const responsiveProps = useResponsiveLayer(props);

        const animatedProps = useAnimationLayer(responsiveProps)

        const EnhancedComponent = useCreateMotionComponent(as)

        return <EnhancedComponent {...animatedProps} ref={_REF} />
    }


const ResponsiveComponent =
    <T extends HTMLMotionComponents = "div", U = {}>(
        props: AllProps<T, U>
    ) => {

        const _REF = props._REF
        const isAnimationControls = _REF && "animations" in _REF

        useEffect(() => {
            if (isAnimationControls) {
                console.error(new Error("It looks like you are using AnimationsControls, you should use it with ResponsiveComponentControls"))
            }
        }, [isAnimationControls])


        if ("responsive" in props) {
            return <ResponsiveComponentAll {...props} />;
        } else {
            return <ResponsiveComponentLite {...props as LiteProps<T>} />;
        }
    }

export { ResponsiveComponentControls };
export default ResponsiveComponent



