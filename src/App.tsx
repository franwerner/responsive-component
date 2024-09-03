import ResponsiveComponent from "@responsive-component/components/ResponsiveComponent"
import BreakPointsControls from "./components/BreakPointsControls"


function App() {

  return (
    <BreakPointsControls>
      <ResponsiveComponent
        whileHover={{
          paddingLeft: 150
        }}
        animate={{
          // backgroundColor : "#FF0000",
          paddingLeft: 30
        }}
        responsiveConfig={{
          xs: { minWidth: true, maxWidth: true }
        }}
        responsive={{
          xs: {
            animate: {
              backgroundColor: "#d3d3"
            }
          }
        }}
      >
        Testing component
      </ResponsiveComponent>
    </BreakPointsControls>
  )
}

export default App
