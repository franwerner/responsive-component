import { breakPoints } from "@responsive-component/constant/breakpoints.constant.js";
import { useCreateObserverEvent } from "@responsive-component/context/Observer.context";
import useBreakPoints from "@responsive-component/hooks/useBreakPoints.hook.js";
import useSyncBreakPoint from "@responsive-component/hooks/useSyncBreakPoint";
import { AllProps, DefaultProps, HTMLMotionComponents } from "@responsive-component/props.type";
import { calculateBreakPointsForWidth } from "@responsive-component/utils/calculateBreakPoints.utils.js";
import joinProperties from "@responsive-component/utils/joinProperties.utils.js";
import { isObject } from "my-utilities";

type OmitProps = "as" | "_REF"
function useResponsiveLayer<T extends HTMLMotionComponents>(props: Omit<AllProps<T>, OmitProps>): DefaultProps<T> & { lastestBreakPoint: string }
function useResponsiveLayer<T extends HTMLMotionComponents>(props: Omit<AllProps<T>, OmitProps | "controls">): DefaultProps<T> & { lastestBreakPoint: string }

function useResponsiveLayer<T extends HTMLMotionComponents>(
    { responsive, responsiveConfig, ...props }: AllProps<T>
) {
    const activeBreakpoints = Object.keys(responsive || {});

    const syncBreakPoint = useSyncBreakPoint(({ cache, current }) => {
        const width = breakPoints[current].minWidth
        const calculate = Object.keys(calculateBreakPointsForWidth({ activeBreakpoints, responsiveConfig, width }))
        if (calculate.length > 0) return calculate
        return cache 
    })

    const { actives } = useBreakPoints({ activeBreakpoints, responsiveConfig });

    const currentBreakPoint = syncBreakPoint ?? actives

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

