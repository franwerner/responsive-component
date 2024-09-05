import { Context, useContext } from "react";
import { ContextStore } from "./Provider";
import { ActionCallback } from "./createContextStore";

const useDispatch = <T,R>(context: Context<ContextStore<T>>, callback: ActionCallback<T,R>) => {

    const value = useContext(context)

    return (payload:R) => {
        callback(value.store,payload)
        value.observer.notify()
    }
   
};


export default useDispatch