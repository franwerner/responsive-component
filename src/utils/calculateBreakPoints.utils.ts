import { isNumber } from "my-utilities";
import { AdaptedBreakpoints } from "./createBreakpoints.utils";
import { ResponsiveConfig } from "@/types/responsive.type"

interface CalculateBreakPoints<T extends AdaptedBreakpoints<T>> {
    activeBreakpoints: (keyof T)[],
    responsiveConfig?: ResponsiveConfig<T>,
    breakPoints: AdaptedBreakpoints<T>
}
interface MaxAndMin {
    minWidth?: number
    maxWidth?: number
};

type ReturnTypeCalculateGeneral<T> = {
    breakpoint: keyof T,
    minWidth?: number,
    maxWidth?: number
}[]

const calculateGeneral = <T extends AdaptedBreakpoints<T>>({ activeBreakpoints, responsiveConfig = {}, breakPoints }: CalculateBreakPoints<T>): ReturnTypeCalculateGeneral<T> => {
    //ordena y calcula los breakpoint segun la configuracion indicada, para que sepa que breakpoint estan antes o se añaden depues.
    //El Unico criterio a tener en cuenta es que si hay un maxWidth = true, siempre va antes que los elemetos que tienen un minWidth.
    return activeBreakpoints.map(key => {

        const { maxWidth, minWidth } = breakPoints[key] || {}

        const defaultConfig = { maxWidth: false, minWidth: true };

        const config = responsiveConfig[key] ?? defaultConfig;

        const maxRelative = config.maxWidth ? maxWidth : undefined
        const minRelative = config.minWidth ? minWidth : undefined;

        return {
            breakpoint: key,
            minWidth: minRelative,
            maxWidth: maxRelative,
        };
    }).sort((a) => (a.maxWidth && !a.minWidth) ? -1 : 0);
}

const GroupByBreakPoint = <T>(array: ReturnTypeCalculateGeneral<T>) => {
    return array.reduce((acc, current) => {
        acc[current.breakpoint] = {
            minWidth: current.minWidth,
            maxWidth: current.maxWidth,
        };
        return acc;
    }, {} as Record<keyof T, MaxAndMin>);
}


const calculateBreakPoints = <T extends AdaptedBreakpoints<T>>({ activeBreakpoints, responsiveConfig, breakPoints }: CalculateBreakPoints<T>) => {
    return GroupByBreakPoint(calculateGeneral({ activeBreakpoints, responsiveConfig, breakPoints }));
}

interface CalculateBreakPointsForWidth<T extends AdaptedBreakpoints<T>> extends CalculateBreakPoints<T> {
    width: number;
}
const calculateBreakPointsForWidth = <T extends AdaptedBreakpoints<T>>({ width, activeBreakpoints, responsiveConfig, breakPoints }: CalculateBreakPointsForWidth<T>) => {
    return GroupByBreakPoint(
        calculateGeneral({ activeBreakpoints, responsiveConfig, breakPoints })
            .filter(({ maxWidth, minWidth }) => {
                const isMinWidth = isNumber(minWidth) ? minWidth : Infinity;
                const isMaxWidth = isNumber(maxWidth) ? maxWidth : 0;

                const maxAndMin = (width >= isMinWidth && width <= isMaxWidth);
                const min = !maxWidth && width >= isMinWidth;
                const max = !minWidth && width <= isMaxWidth;

                return max || min || maxAndMin;
            })
    );
};

export default calculateBreakPoints;
export { calculateBreakPointsForWidth, type CalculateBreakPoints };

