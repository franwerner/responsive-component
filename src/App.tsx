import ResponsiveComponent from "@/components/ResponsiveComponent"
import { useState } from "react"
import { CreateVariants } from "./types/animate.type"
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

  const g: CreateVariants<"hidden" | "show", number> = {
    hidden: (custom) => ({ padding : 0, }),
    show: { backgroundColor: "#FF0000", },
  }

  const f = createBreakpoints(breakPointDefault)
  return (
    <>
      <button onClick={() => setCh(prev => !prev)} style={{ backgroundColor: ch ? "#FF0000" : "#ffff" }}>Click</button>
      {
        <ResponsiveComponent
         variants = {g}
          breakpoints={f}
          responsiveConfig={{
            sm: {
              maxWidth: true
            },
          }}
          whileTap={{
            padding : 0
          }}
          animate={"show"}
          custom={30}
          drag="y"
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 ,power : 1}}
          responsive={{
            lg: {
              animate: {
                padding : 50,
                paddingBottom : 0
              }
            },
            sm: {
              animate : {
                 paddingTop : 30
              }
            }
          }
          }
        >
          <p>fdfd</p>
        </ResponsiveComponent >
      }
    </>
  )
}

export default App


