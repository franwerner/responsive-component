import { useMemo } from "react";
import { BreakPointsKeys } from "../constant/breakpoints.constant";
import useMediaQuery from "./useMediaQuery.hook";
import calculateBreakPoints, { ICalculateBreakPoints } from "../utils/calculateBreakPoints.utils";

const useBreakPoints = ({ activeBreakpoints, responsiveConfig }: ICalculateBreakPoints) => {

  const querys = useMemo(() => calculateBreakPoints({ activeBreakpoints, responsiveConfig })
    , [JSON.stringify(activeBreakpoints), JSON.stringify(responsiveConfig)])

  const queryBreakPoints = useMediaQuery(querys)

  const entries = Object.entries(queryBreakPoints)

  return {
    actives: entries.map(([key, value]) => value.matches && key)
      .filter((i): i is BreakPointsKeys => Boolean(i)),
    querys: queryBreakPoints
  }
}

export default useBreakPoints
