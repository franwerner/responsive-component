import useCreateMotionComponent from "@/hooks/useCreateMotionComponent.hook";
import useAnimationLayer from "@/Layer/UseAnimation.layer";
import useResponsiveLayer from "@/Layer/UseResponsive.layer";
import { HTMLResponsiveComponent, AdditionalProps, ResponsiveProps, } from "@/types/responsive.type";
import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils"

type ResponsiveComponentProps<T extends HTMLResponsiveComponent = "div", U extends AdaptedBreakpoints<U> = never> =
    Omit<AdditionalProps<T>, "children"> &
    ResponsiveProps<T, U>

function ResponsiveComponent
    <T extends HTMLResponsiveComponent = "div", U extends AdaptedBreakpoints<U> = never>(
        { as = "div" as T, ...props }: ResponsiveComponentProps<T, U>
    ) {

    const responsiveProps = useResponsiveLayer(props);

    const animatedProps = useAnimationLayer(responsiveProps)

    const EnhancedComponent = useCreateMotionComponent(as)

    return <EnhancedComponent    {...animatedProps} />
}

export type { ResponsiveComponentProps }
export default ResponsiveComponent
