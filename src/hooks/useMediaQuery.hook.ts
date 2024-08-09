
import { useEffect, useMemo, useState } from "react"
import getMediaQuerys, { GetMediaQuery, MediaQueryListEventModify } from "@/utils/getMediaQuerys.utils"

const useMediaQuery = <T extends string>(query: GetMediaQuery<T>) => {

    const InitialState = useMemo(() => getMediaQuerys(query), [JSON.stringify(query)])

    const [mediaQuerys, setMediaQuerys] = useState(InitialState)

    useEffect(() => {

        if (!InitialState) return

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

    }, [InitialState])

    return mediaQuerys

}

export default useMediaQuery