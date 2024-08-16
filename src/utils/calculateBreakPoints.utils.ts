import { ResponsiveConfig } from "@responsive-component/props.type";
import { BreakPointsKeys, ISizesBreakPoints, breakPoints } from "../constant/breakpoints.constant";
import { isNumber } from "my-utilities";

interface ICalculateBreakPoints {
    activeBreakpoints: BreakPointsKeys[],
    responsiveConfig?: ResponsiveConfig
}

type NewISizes = {
    [K in keyof ISizesBreakPoints]?: ISizesBreakPoints[K] | false
};

const calculateGeneral = ({ activeBreakpoints, responsiveConfig = {} }: ICalculateBreakPoints) => {

 return activeBreakpoints.map(key => {
        const { maxWidth, minWidth } = breakPoints[key] 

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
        acc[current.breakpoint] = {
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
export { calculateBreakPointsForWidth, type ICalculateBreakPoints };

