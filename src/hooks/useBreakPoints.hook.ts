import { useMemo } from "react";
import { BreakPointsKeys } from "../constant/breakpoints.constant";
import useMediaQuery from "./useMediaQuery.hook";
import calculateBreakPoints, { ICalculateBreakPoints } from "../utils/calculateBreakPoints.utils";

const useBreakPoints = ({ activeBreakpoints, responsiveConfig, watch = true }: ICalculateBreakPoints & { watch?: Boolean }) => {

  const querys = useMemo(() => calculateBreakPoints({ activeBreakpoints, responsiveConfig })
    , [JSON.stringify(activeBreakpoints), JSON.stringify(responsiveConfig)])

  const queryBreakPoints = useMediaQuery(watch && querys)

  const entries = Object.entries(queryBreakPoints)

  return {
    actives: watch ? entries.map(([key, value]) => value?.matches && key)
      .filter((i): i is BreakPointsKeys => Boolean(i)) : [],
    querys: watch ? queryBreakPoints : {} as typeof queryBreakPoints
  }
}

export default useBreakPoints
