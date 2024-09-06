import { useMemo } from "react";
import { BreakPointsKeys } from "../constant/breakpoints.constant";
import useMediaQuery from "./useMediaQuery.hook";
import calculateBreakPoints, { CalculateBreakPoints } from "../utils/calculateBreakPoints.utils";

const useBreakPoints = ({ activeBreakpoints, responsiveConfig, watch = true }: CalculateBreakPoints & { watch?: boolean }) => {

  const querys = useMemo(() => calculateBreakPoints({ activeBreakpoints, responsiveConfig })
    , [JSON.stringify(activeBreakpoints), JSON.stringify(responsiveConfig)])

  const queryBreakPoints = useMediaQuery(querys, watch)

  const entries = Object.entries(queryBreakPoints)

  return entries.map(([key, value]) => value.matches && key)
    .filter((i): i is BreakPointsKeys => Boolean(i))
}

export default useBreakPoints
