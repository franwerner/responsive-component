import BreakpointProvider, { BreakPointContext } from "@responsive-component/context/Breakpoint.context";
import ObserverProvider, { ObserverEvents } from "@responsive-component/context/Observer.context";
import { FC, ReactNode } from "react";

/**
 * @description
 * Para que la libreria funcione correctamente, es crucial que envolvamos el proyecto con este bundle.
 */

const ResponsiveComponentBundle: FC<{ children: ReactNode, events?: ObserverEvents }> = ({ children, events = [] }) => {
    return (
        <ObserverProvider events={[...events, BreakPointContext]}>
            <BreakpointProvider>
                {children}
            </BreakpointProvider>
        </ObserverProvider>
    );
};

export default ResponsiveComponentBundle