import { useMemo } from "react";
import useMediaQuery from "./useMediaQuery.hook";
import calculateBreakPoints, { CalculateBreakPoints } from "../utils/calculateBreakPoints.utils";
import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";

const useBreakPoints = <T extends AdaptedBreakpoints<T>>({ activeBreakpoints, responsiveConfig, breakPoints }: CalculateBreakPoints<T>) => {

  const querys = useMemo(() => calculateBreakPoints({ activeBreakpoints, responsiveConfig, breakPoints })
  , [JSON.stringify(activeBreakpoints), JSON.stringify(responsiveConfig)])

  const queryBreakPoints = useMediaQuery(querys)

  const entries = Object.entries(queryBreakPoints)

  const filterMatches =  (entries.map(([key, value]) => value.matches && key)
    .filter((i) => Boolean(i))) as (keyof T)[]

    return filterMatches
}

export default useBreakPoints
