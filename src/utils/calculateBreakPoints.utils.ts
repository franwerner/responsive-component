import { ResponsiveConfig } from "..";
import { BreakPointsKeys, ISizesBreakPoints, breakPoints } from "../constant/breakpoints.constant";

interface ICalculateBreakPoints {
    activeBreakpoints: BreakPointsKeys[],
    responsiveConfig?: ResponsiveConfig
}

type NewISizes = {
    [K in keyof ISizesBreakPoints]?: ISizesBreakPoints[K] | false
};

const entries = Object.entries(breakPoints)

const calculateGeneral = ({ activeBreakpoints, responsiveConfig = {} }: ICalculateBreakPoints) => {

    const filter = entries.filter(([key]) => activeBreakpoints.includes(key));

    return filter.map(([key, value]) => {
        const { maxWidth, minWidth } = value //Valor definidos en el archivo de breakpoints.const

        const defaultConfig = { maxWidth: false, minWidth: true };

        const config = responsiveConfig[key] ?? defaultConfig;

        const maxRelative = config.maxWidth && maxWidth
        const minRelative = config.minWidth && minWidth;

        return {
            breakpoint: key,
            minWidth: minRelative,
            maxWidth: maxRelative,
        };
    }).sort((a) => (a.maxWidth && !a.minWidth) ? -1 : 0);
}

const GroupByBreakPoint = (array: ReturnType<typeof calculateGeneral>) => {
    return array.reduce((acc, current) => {
        acc[current.breakpoint ] = {
            minWidth: current.minWidth,
            maxWidth: current.maxWidth,
        };
        return acc;
    }, {} as Record<BreakPointsKeys, NewISizes>);
}

const calculateBreakPoints = ({ activeBreakpoints, responsiveConfig }: ICalculateBreakPoints) => {
    return GroupByBreakPoint(calculateGeneral({ activeBreakpoints, responsiveConfig }));
}

interface ICalculateBreakPointsForWidth extends ICalculateBreakPoints {
    width: number;
}
const calculateBreakPointsForWidth = ({ width: w, activeBreakpoints, responsiveConfig }: ICalculateBreakPointsForWidth) => {
    
    const width = Math.abs(w)

    return GroupByBreakPoint(
        calculateGeneral({ activeBreakpoints, responsiveConfig })
            .filter(({ maxWidth, minWidth }) => {
                const isMinWidth = typeof minWidth === "number" ? minWidth : Infinity;
                const isMaxWidth = typeof maxWidth === "number" ? maxWidth : 0;

                const maxAndMin = (width >= isMinWidth && width <= isMaxWidth);
                const min = !maxWidth && width >= isMinWidth;
                const max = !minWidth && width <= isMaxWidth;

                return max || min || maxAndMin;
            })
    );
};

export default calculateBreakPoints;
export { calculateBreakPointsForWidth, type ICalculateBreakPoints };

