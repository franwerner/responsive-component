/*@Components*/
export * from "@/components/ResponsiveComponent"
export { default as ResponsiveComponent } from '@/components/ResponsiveComponent';
export * from '@/components/ResponsiveComponent';
export { default as MotionComponent } from "@/components/MotionComponent"
export * from "@/components/MotionComponent"
/*@Hooks*/
export { default as useMediaQuery } from "@/hooks/useMediaQuery.hook"
export { default as useBreakPoints } from "@/hooks/useBreakPoints.hook"
/*@Types*/
export type { HTMLResponsiveComponent, ResponsiveAnimate, ResponsiveConfig, } from "@/types/responsive.type"
export type { AnimateProperties, AnimateComponentProps } from "@/types/animate.type"
/*@Utils*/
export * from "@/utils/calculateBreakPoints.utils"
export { default as calculateBreakPoints } from "@/utils/calculateBreakPoints.utils"
export { createBreakpoints, type AdaptedBreakpoints } from "@/utils/createBreakpoints.utils"
