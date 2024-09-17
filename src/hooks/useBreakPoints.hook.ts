import { useMemo } from "react";
import useMediaQuery from "./useMediaQuery.hook";
import calculateBreakPoints, { CalculateBreakPoints } from "../utils/calculateBreakPoints.utils";
import { Breakpoints } from "@/types/breakpoint.types";

const useBreakPoints = ({ activeBreakpoints, responsiveConfig, breakPoints, watch = true }: CalculateBreakPoints & { watch?: boolean }) => {

  const querys = useMemo(() => calculateBreakPoints({ activeBreakpoints, responsiveConfig, breakPoints })
    , [JSON.stringify(activeBreakpoints), JSON.stringify(responsiveConfig)])

  const queryBreakPoints = useMediaQuery(querys, watch)

  const entries = Object.entries(queryBreakPoints)

  return entries.map(([key, value]) => value.matches && key)
    .filter((i): i is Breakpoints => Boolean(i))
}

export default useBreakPoints
