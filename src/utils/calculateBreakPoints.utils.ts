import { ResponsiveConfig } from "@responsive-component/props.type";
import { BreakPointsKeys, breakPoints, SizesBreakPoints } from "../constant/breakpoints.constant";
import { isNumber } from "my-utilities";

interface CalculateBreakPoints {
    activeBreakpoints: BreakPointsKeys[],
    responsiveConfig?: ResponsiveConfig
}

interface MaxAndMin  {
    minWidth?: SizesBreakPoints["minWidth"]
    maxWidth?: number
};

const calculateGeneral = ({ activeBreakpoints, responsiveConfig = {} }: CalculateBreakPoints) => {
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
    }, {} as Record<BreakPointsKeys, MaxAndMin>);
}


const calculateBreakPoints = ({ activeBreakpoints, responsiveConfig }: CalculateBreakPoints) => {
    return GroupByBreakPoint(calculateGeneral({ activeBreakpoints, responsiveConfig }));
}

interface CalculateBreakPointsForWidth extends CalculateBreakPoints {
    width: number;
}
const calculateBreakPointsForWidth = ({ width, activeBreakpoints, responsiveConfig }: CalculateBreakPointsForWidth) => {
    return GroupByBreakPoint(
        calculateGeneral({ activeBreakpoints, responsiveConfig })
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

