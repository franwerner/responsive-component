import { breakPoints } from "@responsive-component/constant/breakpoints.constant";
import { breakPointContext } from "@responsive-component/context/BreakPointProvider.context";
import useBreakPoints from "@responsive-component/hooks/useBreakPoints.hook.js";
import { AllProps, DefaultProps, HTMLMotionComponents } from "@responsive-component/props.type";
import { calculateBreakPointsForWidth } from "@responsive-component/utils/calculateBreakPoints.utils";
import joinProperties from "@responsive-component/utils/joinProperties.utils.js";
import { isObject } from "my-utilities";
import { useSelector } from "react-observer-context";

type OmitProps = "as" | "_REF"
function useResponsiveLayer<T extends HTMLMotionComponents>(props: Omit<AllProps<T>, OmitProps>): DefaultProps<T> & { lastestBreakPoint: string }
function useResponsiveLayer<T extends HTMLMotionComponents>(props: Omit<AllProps<T>, OmitProps | "controls">): DefaultProps<T> & { lastestBreakPoint: string }

function useResponsiveLayer<T extends HTMLMotionComponents>(
    { responsive, responsiveConfig, ...props }: AllProps<T>
) {
    const activeBreakpoints = Object.keys(responsive || {});

    const syncBreakPoint = useSelector(breakPointContext, (store) => {
        const bk = store.breakPoint
        const width = bk ? breakPoints[bk].maxWidth : 0
        return Object.keys(calculateBreakPointsForWidth({ activeBreakpoints, responsiveConfig, width }))
    })

    const { actives } = useBreakPoints({ activeBreakpoints, responsiveConfig, watch: !syncBreakPoint });

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

