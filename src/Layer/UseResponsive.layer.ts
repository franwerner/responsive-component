import { ResponsiveComponentProps } from "@/components/ResponsiveComponent";
import useBreakPoints from "@/hooks/useBreakPoints.hook.js";
import { HTMLResponsiveComponent } from "@/types/responsive.type";
import { AnimateComponentProps } from "@/types/animate.type";
import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";
import joinProperties from "@/utils/joinProperties.utils.js";
import { isObject } from "my-utilities";


function useResponsiveLayer<T extends HTMLResponsiveComponent, U extends AdaptedBreakpoints<U> = never>(
    { responsive, responsiveConfig, breakpoints, ...props }: Omit<ResponsiveComponentProps<T, U>,"as">
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
        ...(calculateResponsive() as unknown) as AnimateComponentProps<T>,
        lastestBreakPoint: JSONlastestBreakPoint
    }
};

export default useResponsiveLayer;

