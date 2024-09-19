import useBreakPoints from "@/hooks/useBreakPoints.hook.js";
import { AllProps, DefaultProps, HTMLMotionComponents } from "@/types/responsive-component.types"
import joinProperties from "@/utils/joinProperties.utils.js";
import { isObject } from "my-utilities";


type OmitProps = "as" | "_REF"
function useResponsiveLayer<T extends HTMLMotionComponents, U>(props: Omit<AllProps<T, U>, OmitProps>): DefaultProps<T> & { lastestBreakPoint: string }
function useResponsiveLayer<T extends HTMLMotionComponents, U>(props: Omit<AllProps<T, U>, OmitProps | "controls">): DefaultProps<T> & { lastestBreakPoint: string }

function useResponsiveLayer<T extends HTMLMotionComponents, U = never>(
    { responsive, responsiveConfig, breakpoints, ...props }: AllProps<T, U>
) {
    const activeBreakpoints = Object.keys(responsive || {});

    const currentBreakPoint = useBreakPoints({ activeBreakpoints, responsiveConfig, breakPoints: breakpoints });

    const JSONlastestBreakPoint = JSON.stringify(currentBreakPoint);

    const calculateResponsive = () => {
        if (!isObject(responsive)) return props;

        return currentBreakPoint.reduce((acc, breakpoint) => {
            const currentBreakPoint = responsive[breakpoint];
            if (!isObject(currentBreakPoint)) return acc;
            return joinProperties({ props: acc, replaceProps: currentBreakPoint });
        }, props);
    };

    return {
        ...calculateResponsive() as DefaultProps<T>,
        lastestBreakPoint: JSONlastestBreakPoint
    }
};

export default useResponsiveLayer;

