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

/**
 * @description 
 * Esta función tiene en cuenta la prioridad de los breakpoints configurados.
 * Los breakpoints con configuración `{ minWidth: true }` tienen mayor prioridad que aquellos 
 * configurados como `{ maxWidth: true }` o `{ maxWidth: true, midWidth: true }`. 
 * Por lo tanto, el resultado del último breakpoint activo en la lista se determinará 
 * según esta lógica de prioridad.
 * 
 * @note 
 * La lógica se basa en que los breakpoints con `minWidth` son más específicos que 
 * aquellos que solo utilizan `maxWidth`.
 * 
 * @example 
 * ```javascript
 * 
 * const responsiveConfig = {
 *   xs: {
 *     minWidth: true
 *   },
 *   md: {
 *     maxWidth: true    
 *   }
 * };
 * // Supongamos que xs es 440px y md es 1024px.
 * // A pesar de que md sea mayor que xs, la prioridad la tiene xs
 * // debido a su configuración con minWidth activo.
 * ```
 * 
 * @returns Un array con el orden de los breakpoints según su prioridad. 
 * En el ejemplo anterior, el resultado sería `["md", "xs"]`.
 */

const calculateGeneral = <T extends AdaptedBreakpoints<T>>({ activeBreakpoints, responsiveConfig = {}, breakPoints }: CalculateBreakPoints<T>): ReturnTypeCalculateGeneral<T> => {

    const order = [...activeBreakpoints].sort((a, b) => breakPoints[a].minWidth - breakPoints[b].minWidth)

    return order.map(key => {

        const { maxWidth, minWidth } = breakPoints[key] || {}

        const defaultConfig = { maxWidth: false, minWidth: true };

        const config = responsiveConfig[key] ?? defaultConfig;

        const maxRelative = config.maxWidth ? maxWidth : undefined
        const minRelative = config.minWidth ? minWidth : undefined;
        const isNotBetween = config.maxWidth && !config.minWidth ? (minWidth - 0.2) : maxRelative //Le restamos al mininmo -1 para el alcance maximo.

        return {
            breakpoint: key,
            minWidth: minRelative,
            maxWidth: isNotBetween,
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


const calculateBreakPoints = <T extends AdaptedBreakpoints<T>>(props: CalculateBreakPoints<T>) => GroupByBreakPoint(calculateGeneral(props));

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

