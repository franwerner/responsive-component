import { ResponsiveConfig } from "@responsive-component/types";
import { isNumber } from "my-utilities";
import { TransformBreakPoints } from "./transformBreakPoints.utils";
import { Breakpoints } from "@responsive-component/types/breakpoint.types";

interface CalculateBreakPoints {
    activeBreakpoints: Breakpoints[],
    responsiveConfig?: ResponsiveConfig,
    breakPoints: { [K in Breakpoints]: TransformBreakPoints }
}

interface MaxAndMin {
    minWidth?: number
    maxWidth?: number
};

const calculateGeneral = ({ activeBreakpoints, responsiveConfig = {}, breakPoints }: CalculateBreakPoints) => {
    //ordena y calcula los breakpoint segun la configuracion indicada, para que sepa que breakpoint estan antes o se añaden depues.
    //El Unico criterio a tener en cuenta es que si hay un maxWidth = true, siempre va antes que los elemetos que tienen un minWidth.
    return activeBreakpoints.map(key => {

        const { maxWidth, minWidth } = breakPoints[key]

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

const GroupByBreakPoint = (array: ReturnType<typeof calculateGeneral>) => {
    return array.reduce((acc, current) => {
        acc[current.breakpoint] = {
            minWidth: current.minWidth,
            maxWidth: current.maxWidth,
        };
        return acc;
    }, {} as Record<Breakpoints, MaxAndMin>);
}


const calculateBreakPoints = ({ activeBreakpoints, responsiveConfig, breakPoints }: CalculateBreakPoints) => {
    return GroupByBreakPoint(calculateGeneral({ activeBreakpoints, responsiveConfig, breakPoints }));
}

interface CalculateBreakPointsForWidth extends CalculateBreakPoints {
    width: number;
}
const calculateBreakPointsForWidth = ({ width, activeBreakpoints, responsiveConfig, breakPoints }: CalculateBreakPointsForWidth) => {
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

export const testAAA = { f: "fdf" }
export default calculateBreakPoints;
export { calculateBreakPointsForWidth, type CalculateBreakPoints };

