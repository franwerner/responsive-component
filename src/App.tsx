import ResponsiveComponent from "@responsive-component/components/ResponsiveComponent"
import BreakPointsControls from "./components/BreakPointsControls"
import BreakPointProvider from "./context/BreakPointProvider.context"

function App() {

  return (
    <BreakPointProvider>
      <BreakPointsControls>
        <ResponsiveComponent
          whileHover={{
            paddingLeft: 150
          }}
          animate={{
            backgroundColor: "#FF0000",
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
    </BreakPointProvider>
  )
}

export default App
