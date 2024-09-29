import { HTMLResponsiveComponent } from "@/types/responsive.type";
import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";
import { isFunction } from "my-utilities";
import { ReturnTypeResponsiveLayer } from "./UseResponsive.layer";

type ReturnTypeChildrenlayer<
    T extends HTMLResponsiveComponent
> = ReturnTypeResponsiveLayer<T,any>

const useChildrenLayer = <
    T extends HTMLResponsiveComponent,
    U extends AdaptedBreakpoints<U>,
>(props: ReturnTypeResponsiveLayer<T, U>):ReturnTypeChildrenlayer<T> => {

    const { children, currentBreakPoints } = props

    const getChildren = () => {
        const lastestBreakPoint = Array.isArray(currentBreakPoints) ? currentBreakPoints[currentBreakPoints.length - 1] : undefined
        if (Array.isArray(children)) {
            return children.map(i => isFunction(i) ? i(lastestBreakPoint) : i)
        } else if (isFunction(children)) return children(lastestBreakPoint)
        return children
    }

    return {
        ...props,
        children: getChildren()
    }
};

export type {ReturnTypeChildrenlayer}
export default useChildrenLayer