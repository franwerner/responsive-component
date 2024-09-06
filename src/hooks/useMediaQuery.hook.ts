
import { useEffect, useMemo, useState } from "react"
import getMediaQuerys, { GetMediaQuery, MediaQueryListEventModify } from "@responsive-component/utils/getMediaQuerys.utils"

const useMediaQuery = <T extends string>(query: GetMediaQuery<T>,watch : boolean = true) => {

    const InitialState = useMemo(() => getMediaQuerys(query), [JSON.stringify(query)])

    const [mediaQuerys, setMediaQuerys] = useState(InitialState)

    useEffect(() => {

        if (!InitialState || !watch) return

        InitialState !== mediaQuerys && setMediaQuerys(InitialState)

        const onChange = (e: MediaQueryListEventModify) => {
            setMediaQuerys(prev => {
                const key = e.target.name
                return {
                    ...prev,
                    [key]: e.target
                };
            });
        }


        for (const key in InitialState) {
            const media = InitialState[key]
            media.addEventListener("change", onChange as EventListener)
        }

        return () => {
            for (const key in InitialState) {
                const media = InitialState[key]
                media.removeEventListener("change", onChange as EventListener)
            }
        }

    }, [InitialState,watch])

    return watch ? mediaQuerys : {} as typeof InitialState

}

export default useMediaQuery