import ResponsiveComponent from "@/components/ResponsiveComponent"
import {} from "my-utilities"

function App() {

  return (
    <>
      <ResponsiveComponent
        whileHover={{
         paddingLeft: 150
        }}
        animate = {{
          // backgroundColor : "#FF0000",
          paddingLeft : 30
        }}
        responsiveConfig={{
          xs : {minWidth:true,maxWidth :true}
        }}
        responsive = {{
          xs : {
            animate : {
              backgroundColor : "#d3d3"
            }
          }
        }}
      >
        Testing component
      </ResponsiveComponent>
    </>
  )
}

export default App
