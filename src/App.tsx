import ResponsiveComponent from "@responsive-component/components/ResponsiveComponent"
import BreakPointsControls from "./components/BreakPointsControls"
import {BreakPointProvider} from "./context/BreakPointsTheme.context"

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
                backgroundColor: "#008000"
              }
            }
          }}
        >
          <p style={{ height: "300px" }}>
            Testing componentsdasdsdsadsdasdasdasdasdasdasdasdasdasdasdasd
          </p>
        </ResponsiveComponent>
      </BreakPointsControls>
    </BreakPointProvider>
  )
}

export default App
