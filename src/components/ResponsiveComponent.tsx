import useAnimationLayer from "@/Layer/UseAnimation.layer";
import useResponsiveLayer from "@/Layer/UseResponsive.layer";
import { AllProps, HTMLMotionComponents, LiteProps } from "@/types/responsive-component.types";
import { motion } from "framer-motion";
import { useMemo } from "react";

const useCreateMotionComponent = (as: HTMLMotionComponents) => {
    return useMemo(() => {
        return motion.create(as as any)
    }, [])
}

const ResponsiveComponentAll =
    <T extends HTMLMotionComponents, U>(
        { as = 'div' as T, _REF, ...props }: AllProps<T, U>) => {

        const responsiveProps = useResponsiveLayer(props);

        const animatedProps = useAnimationLayer(responsiveProps)

        const EnhancedComponent = useCreateMotionComponent(as)

        return <EnhancedComponent    {...animatedProps} ref={_REF} />
    }


// Lo podemos usar para cuando necesitemos la implementacion de resteo de animaciones correctamente.
const ResponsiveComponentLite =
    <T extends HTMLMotionComponents>(
        { as = 'div' as T, _REF, ...props }: LiteProps<T>,
    ) => {
        const animatedProps = useAnimationLayer(props)

        const EnhancedComponent = useCreateMotionComponent(as)

        return <EnhancedComponent {...animatedProps} ref={_REF} />
    }
1


const ResponsiveComponent =
    <T extends HTMLMotionComponents = "div", U = never>(
        props: AllProps<T, U>
    ) => {

        if ("responsive" in props && "breakpoints" in props) {
            return <ResponsiveComponentAll {...props} />;
        } else {
            return <ResponsiveComponentLite {...(props as any) as LiteProps<T>} />
        }
    }

export default ResponsiveComponent



