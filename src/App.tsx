import ResponsiveComponent from "@/components/ResponsiveComponent"
import { useState } from "react"
import { createBreakpoints } from "./utils/createBreakpoints.utils"


function App() {

  const [ch, setCh] = useState(false)


  const breakPointDefault = {
    "lg": 1024,
    "xs": 440,
    "sm": 640,
    "md": 768,
    "2xl": 1536,
    "xl": 1280,
  }


  const f = createBreakpoints(breakPointDefault)


  return (
    <>
      <button onClick={() => setCh(prev => !prev)} style={{ backgroundColor: ch ? "#FF0000" : "#ffff" }}>Click</button>
      {
        <ResponsiveComponent
          breakpoints={f}
          responsiveConfig={{
            sm: {
              maxWidth: true
            },
          }}
          whileTap = {{
            height : "100vh"
          }}
          drag="y"
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          responsive={{
            lg: {
              animate: {
                borderTop: "10px solid #f3f3",
                borderTopColor : "#0e0e",
                borderColor: "#FF0000 #000 #0e0e",
                borderStyle : "dotted dashed solid",
                display: "flex",
                height : "30vh"
              },

            },
            sm: {
              animate: {
                border: "10px solid #000",
                borderTopLeftRadius: ["20%", 30, "100%"],
                top: 70,
              }
            }
          }}
        >
          <p>fdfd</p>

        </ResponsiveComponent >
      }
    </>
  )
}

export default App
