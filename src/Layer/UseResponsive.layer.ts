import useBreakPoints from "@/hooks/useBreakPoints.hook.js";
import { AllProps, DefaultProps, HTMLMotionComponents } from "@/types/responsive-component.types"
import joinProperties from "@/utils/joinProperties.utils.js";
import { isObject } from "my-utilities";


type OmitProps = "as" | "_REF"
function useResponsiveLayer<T extends HTMLMotionComponents>(props: Omit<AllProps<T>, OmitProps>): DefaultProps<T> & { lastestBreakPoint: string }
function useResponsiveLayer<T extends HTMLMotionComponents>(props: Omit<AllProps<T>, OmitProps | "controls">): DefaultProps<T> & { lastestBreakPoint: string }

function useResponsiveLayer<T extends HTMLMotionComponents,U>(
    { responsive, responsiveConfig, breakpoints, ...props }: AllProps<T,U>
) {
    const activeBreakpoints = Object.keys(responsive);

    const currentBreakPoint = useBreakPoints({ activeBreakpoints, responsiveConfig, breakPoints: breakpoints });

    const JSONlastestBreakPoint = JSON.stringify(currentBreakPoint);

    const calculateResponsive = () => {
        if (!responsive || !isObject(responsive)) return props;

        return currentBreakPoint.reduce((acc, breakpoint) => {
            const currentBreakPoint = responsive?.[breakpoint];
            const verification = isObject(currentBreakPoint);

            if (!verification) return acc;

            return joinProperties({ props: acc, replaceProps: currentBreakPoint });
        }, props);
    };

    return {
        ...calculateResponsive() as DefaultProps<T>,
        lastestBreakPoint: JSONlastestBreakPoint
    }
};

export default useResponsiveLayer;

