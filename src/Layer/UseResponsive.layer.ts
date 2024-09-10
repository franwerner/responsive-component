import { useSelector } from "@responsive-component/context/BreakPointsTheme.context";
import useBreakPoints from "@responsive-component/hooks/useBreakPoints.hook.js";
import { AllProps, DefaultProps, HTMLMotionComponents } from "@responsive-component/props.type";
import { calculateBreakPointsForWidth } from "@responsive-component/utils/calculateBreakPoints.utils";
import joinProperties from "@responsive-component/utils/joinProperties.utils.js";
import { isObject } from "my-utilities";

type OmitProps = "as" | "_REF"
function useResponsiveLayer<T extends HTMLMotionComponents>(props: Omit<AllProps<T>, OmitProps>): DefaultProps<T> & { lastestBreakPoint: string }
function useResponsiveLayer<T extends HTMLMotionComponents>(props: Omit<AllProps<T>, OmitProps | "controls">): DefaultProps<T> & { lastestBreakPoint: string }

function useResponsiveLayer<T extends HTMLMotionComponents>(
    { responsive, responsiveConfig, ...props }: AllProps<T>
) {
    const activeBreakpoints = Object.keys(responsive || {});

    const syncBreakPoint = useSelector((store) => {
        const { list, currentBreakPoint } = store.breakpoints
        const width = currentBreakPoint ? list[currentBreakPoint].minWidth : 0
        return Object.keys(calculateBreakPointsForWidth({ activeBreakpoints, responsiveConfig, width }))
    }) ?? []

    const actives = useBreakPoints({ activeBreakpoints, responsiveConfig, watch: syncBreakPoint.length == 0 });

    const currentBreakPoint = syncBreakPoint.length == 0 ? actives : syncBreakPoint

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

