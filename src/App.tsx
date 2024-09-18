import ResponsiveComponent from "@/components/ResponsiveComponent"
import {createBreakpoints} from "./utils/createBreakpoints.utils"

function App() {

  const breakPointDefault = {
    "xs": 440,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "2xl": 1536,
  }


  const f = createBreakpoints(breakPointDefault)

  return (
    <ResponsiveComponent
      breakpoints={f}
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
  )
}

export default App
