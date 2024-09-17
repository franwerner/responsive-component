import useBreakPoints from "@responsive-component/hooks/useBreakPoints.hook.js";
import { AllProps, DefaultProps, HTMLMotionComponents } from "@responsive-component/types";
import joinProperties from "@responsive-component/utils/joinProperties.utils.js";
import transformBreakPoints from "@responsive-component/utils/transformBreakPoints.utilts";
import { isObject } from "my-utilities";


type OmitProps = "as" | "_REF"
function useResponsiveLayer<T extends HTMLMotionComponents>(props: Omit<AllProps<T>, OmitProps>): DefaultProps<T> & { lastestBreakPoint: string }
function useResponsiveLayer<T extends HTMLMotionComponents>(props: Omit<AllProps<T>, OmitProps | "controls">): DefaultProps<T> & { lastestBreakPoint: string }

function useResponsiveLayer<T extends HTMLMotionComponents>(
    { responsive, responsiveConfig, breakpoints, ...props }: AllProps<T>
) {
    const activeBreakpoints = Object.keys(responsive || {});

    const transformBreakPoint = transformBreakPoints(breakpoints)

    const currentBreakPoint = useBreakPoints({ activeBreakpoints, responsiveConfig, breakPoints: transformBreakPoint });

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

