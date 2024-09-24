import { ResponsiveComponentProps } from "@/components/ResponsiveComponent";
import useBreakPoints from "@/hooks/useBreakPoints.hook.js";
import { HTMLResponsiveComponent } from "@/types/responsive.type";
import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";
import joinProperties from "@/utils/joinProperties.utils.js";
import { isFunction, isObject } from "my-utilities";
import { useEffect } from "react";

type ReturnTypeResponsiveLayer<T extends HTMLResponsiveComponent, U extends AdaptedBreakpoints<U> = never> =
    Omit<ResponsiveComponentProps<T, U>, "responsive" | "responsiveConfig" | "breakpoints" | "observerBreakpoints">
    & { currentBreakPoints: (keyof U)[] }

function useResponsiveLayer<T extends HTMLResponsiveComponent, U extends AdaptedBreakpoints<U> = never>(
    { responsive, responsiveConfig, breakpoints, observerBreakpoints, ...props }: ResponsiveComponentProps<T, U>
): ReturnTypeResponsiveLayer<T, U> {
    const activeBreakpoints = Object.keys(responsive || {});

    const currentBreakPoints = useBreakPoints({ activeBreakpoints, responsiveConfig, breakPoints: breakpoints });

    useEffect(() => {
        isFunction(observerBreakpoints) && observerBreakpoints(currentBreakPoints[currentBreakPoints.length - 1])
    }, [JSON.stringify(currentBreakPoints)])


    const calculateResponsive = () => {
        if (!isObject(responsive)) return props;
        return currentBreakPoints.reduce((acc, breakpoint) => {
            const currentBreakPoints = responsive[breakpoint];
            if (!isObject(currentBreakPoints)) return acc;
            return joinProperties({ props: acc, replaceProps: currentBreakPoints });
        }, props);
    };

    return {
        ...calculateResponsive(),
        currentBreakPoints: currentBreakPoints
    }
};

export type { ReturnTypeResponsiveLayer }
export default useResponsiveLayer;

