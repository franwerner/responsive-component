import ResponsiveComponent from "@responsive-component/components/ResponsiveComponent"
import BreakPointsControls from "./components/BreakPointsControls"
import BreakpointProvider, { BreakPointContext } from "./context/Breakpoint.context"
import ObserverProvider from "./context/Observer.context"

function App() {

  return (
    <ObserverProvider events={[BreakPointContext]}>
      <BreakpointProvider>
        <BreakPointsControls>
          <ResponsiveComponent
            whileHover={{
              paddingLeft: 150
            }}
            animate={{
              // backgroundColor : "#FF0000",
              paddingLeft: 30
            }}

            responsive={{
              xs: {
                animate: {
                  backgroundColor: "#d3d3"
                }
              },
              md: {
                animate: {
                  backgroundColor: "#000"
                }
              }
            }}
          >
            Testing component
          </ResponsiveComponent>
        </BreakPointsControls>
      </BreakpointProvider>
    </ObserverProvider>
  )
}

export default App
