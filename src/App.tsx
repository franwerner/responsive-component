import ResponsiveComponent from "@/components/ResponsiveComponent"
import { createBreakpoints } from "./utils/createBreakpoints.utils"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"

function App() {

  const [ch, setCh] = useState(true)

  const breakPointDefault = {
    "xs": 440,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "2xl": 1536,
  }

  const f = createBreakpoints(breakPointDefault)

  /**
   * NO SE DEBEN AGREGAR PROPIEADES NUEVAS ENTRE RENDERIZADOS.
   * DEBIDO A QUE EL USEFFECT QUE MANEJA INTERNAMENTE DE EL RESTEO DE LAS PROPIEADES SOLO ALMACENA LAS PROPIEDADES ENTRANTES CADA VEZ QUE CAMBIE EL BREAKPOINT
   * POR LO TANTO AGREGAR PROPIEDADES NUEVAS NO ES VALIDO Y GENERA INCONSISTENCIAS.
   * PARA HACERLO DE FORMA CORRECTA ES PROPORCIONADO LA PROPIEDAD IGUAL Y AGREGANDOLE LOGICA PARA UN VALOR POR DEFECTO.
   * {
   * backgroundColor : state ? "#FF0000" : "#FFF"
   * }
   * 
   */


  return (
    <>
      <button onClick={() => setCh(prev => !prev)}>Click</button>
      <AnimatePresence>
      {
        ch &&
          <ResponsiveComponent
          breakpoints={f}
          >
           {() => {
                return <div>asdsad</div>
           }}
          </ResponsiveComponent>
      }
      </AnimatePresence>
    </>
  )
}

export default App
