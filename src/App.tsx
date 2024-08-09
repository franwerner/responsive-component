import ResponsiveComponent from "@/components/ResponsiveComponent"

function App() {

  return (
    <>
      <ResponsiveComponent
        whileHover={{
         paddingLeft: 150
        }}
        animate = {{
          backgroundColor : "#FF0000",
          paddingLeft : 30
        }}
      >
        Testing component
      </ResponsiveComponent>
    </>
  )
}

export default App
