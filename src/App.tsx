import ResponsiveComponent from "@/components/ResponsiveComponent"
import { useState } from "react"
import { AnimationVariants } from "./types/animate.type"
import { createBreakpoints } from "./utils/createBreakpoints.utils"

/**
 * Deberia obtener verificar siempre en base la prop si es un string.
 * En caso de que lo sea verifica si es una variante y une el objecto de la variante con el objecto del breakpoint.
 * 
 *  */



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

  const g: AnimationVariants<"hidden" | "show", number> = {
    hidden: (custom) => ({ marginTop: custom, }),
    show: { backgroundColor: "#FF0000", },
  }


  const f = createBreakpoints(breakPointDefault)
  return (
    <>
      <button onClick={() => setCh(prev => !prev)} style={{ backgroundColor: ch ? "#FF0000" : "#ffff" }}>Click</button>
      {
        <ResponsiveComponent
          variants={g}
          breakpoints={f}
          // responsiveConfig={{
          //   sm: {
          //     maxWidth: true
          //   },
          // }}
          whileTap={{
            height: "100vh"
          }}
          animate={"hidden"}
          custom={1}
          drag="y"
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          responsive={{
            lg: {
              variants: {
                hidden: (c) => ({ margin: c + 30, }),
              },
            },
            sm: {
              variants: {
                hidden: (c) => ({ backgroundColor: "#FF0000", }),
                show: {}
              },
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
