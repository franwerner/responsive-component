import { isObject } from "my-utilities";
import { breakPoints } from "@responsive-component/constant/breakpoints.constant.js";
import useBreakPoints from "@responsive-component/hooks/useBreakPoints.hook.js";
import useSyncBreakPoint from "@responsive-component/hooks/useSyncBreakPoint.js";
import { AllProps, DefaultProps, HTMLMotionComponents } from "@responsive-component/props.type";
import { calculateBreakPointsForWidth } from "@responsive-component/utils/calculateBreakPoints.utils.js";
import joinProperties from "@responsive-component/utils/joinProperties.utils.js";

type OmitProps = "as" | "_REF"
function useResponsiveLayer<T extends HTMLMotionComponents>(props: Omit<AllProps<T>, OmitProps>): DefaultProps<T> & { lastestBreakPoint: string }
function useResponsiveLayer<T extends HTMLMotionComponents>(props: Omit<AllProps<T>, OmitProps | "controls">): DefaultProps<T> & { lastestBreakPoint: string }

function useResponsiveLayer<T extends HTMLMotionComponents>(
    { responsive, responsiveConfig, ...props }: AllProps<T>
) {
    const activeBreakpoints = Object.keys(responsive || {});

    const { actives } = useBreakPoints({ activeBreakpoints, responsiveConfig });

    const lastestBreakPoint = useSyncBreakPoint()

    const responsiveTesting = (() => {
        if (!lastestBreakPoint) return actives
        const width = breakPoints[lastestBreakPoint].minWidth
        if (!width) return actives
        return Object.keys(calculateBreakPointsForWidth({ activeBreakpoints, responsiveConfig, width }))
    })();


    const JSONlastestBreakPoint = JSON.stringify(responsiveTesting);

    const calculateResponsive = () => {
        if (!responsive || !isObject(responsive)) return props;

        return responsiveTesting.reduce((acc, breakpoint) => {
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

