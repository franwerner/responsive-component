import ResponsiveComponent from "@responsive-component/components/ResponsiveComponent"

function App() {

  const breakPointDefault = {
    "xs": 440,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "2xl": 1536,
  }


  return (
    <ResponsiveComponent
      breakpoints={breakPointDefault}
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
