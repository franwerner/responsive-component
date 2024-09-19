/*@Components*/
export * from "@/components/ResponsiveComponent"
export { default as ResponsiveComponent } from '@/components/ResponsiveComponent';
/*@Hooks*/
export { default as useMediaQuery } from "@/hooks/useMediaQuery.hook"
export {default as useBreakPoints} from "@/hooks/useBreakPoints.hook"
/*@Types*/
export type {AllProps,AnimateProps,HTMLMotionComponents,DefaultProps,ResponsiveMotionProps} from "@/types/responsive-component.types"
export * from "@/utils/calculateBreakPoints.utils"
export {default as calculateBreakPoints } from "@/utils/calculateBreakPoints.utils"
export * from "@/utils/createBreakpoints.utils"
