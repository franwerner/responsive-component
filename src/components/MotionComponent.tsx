/**
 * Este componente nos ayudara a utilizar el hook useAnimationLayer para fixear las animaciones de framer-motion.
 */
import useCreateMotionComponent from "@/hooks/useCreateMotionComponent.hook"
import useAnimationLayer from "@/Layer/UseAnimation.layer"
import { AnimateComponentProps } from "@/types/animate.type"
import { HTMLResponsiveComponent } from "@/types/responsive.type"
import { AdditionalProps } from "@/types/responsive.type"

type MotionComponentProps<T extends HTMLResponsiveComponent = "div"> = AdditionalProps<T> & AnimateComponentProps<T>

const MotionComponent =
    <T extends HTMLResponsiveComponent>(
        { as = 'div' as T, ...props }: MotionComponentProps<T>,
    ) => {

        const animatedProps = useAnimationLayer(props)

        const EnhancedComponent = useCreateMotionComponent(as)

        return <EnhancedComponent {...animatedProps} />
    }

export type { MotionComponentProps }
export default MotionComponent