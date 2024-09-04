

type State<T> = {
    [K in keyof T]: T[K]
}
type Actions<T,U> = {
    [K in keyof U]: (state: State<T>,currentValue:any) => void
}

const createReducer = <T, U>(
    state: State<T>,
    actions: Actions<T,U>
) => {
    return (action:keyof U,currentValue) => {
        actions[action](state,currentValue)
    }
}

const g = createReducer(
    { g: "hola" },
    { f: (state,currentValue) => {}}
)
g("f","h")