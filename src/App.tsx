import ResponsiveComponent from "@responsive-component/components/ResponsiveComponent"
import BreakPointsControls from "./components/BreakPointsControls"
import ResponsiveComponentBundle from "./components/ResponsiveComponentBundle"
import createContextStore from "./t/createContextStore"
import useDispatch from "./t/useDispatch.hook"
import useSelector from "./t/useSelector.hook"

const store = { h: "test" }


const [Provider, context, actions] = createContextStore(
  store,
  {
    set: (store, payload: string) => {
      store.h = payload
    }
  }
)


const Test = () => {
  const data = useSelector(context, (store) => store.h)
  const dispatch = useDispatch(context, actions.set)

  return (
    <p onClick={() => dispatch("Pija")}>{data}</p>
  )
}
function App() {


  return (
    <Provider>
      <Test></Test>
      <ResponsiveComponentBundle>
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
                  backgroundColor: "#000"
                }
              }
            }}
          >
            Testing component
          </ResponsiveComponent>
        </BreakPointsControls>
      </ResponsiveComponentBundle>
    </Provider>
  )
}

export default App
