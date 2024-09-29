/*@Components*/
export * from "@/components/ResponsiveComponent"
export { default as ResponsiveComponent } from '@/components/ResponsiveComponent';
export * from '@/components/ResponsiveComponent';
/*@Hooks*/
export { default as useMediaQuery } from "@/hooks/useMediaQuery.hook"
export { default as useBreakPoints } from "@/hooks/useBreakPoints.hook"
/*@Types*/
export type { HTMLResponsiveComponent, ResponsiveAnimate, ResponsiveConfig,ResponsiveProperties, } from "@/types/responsive.type"
export type { AnimationProperties, AnimationComponentProps,AnimationVariants,CreateVariants,AnimationConsumer } from "@/types/animate.type"
/*@Utils*/
export * from "@/utils/calculateBreakPoints.utils"
export { default as calculateBreakPoints } from "@/utils/calculateBreakPoints.utils"
export { createBreakpoints, type AdaptedBreakpoints } from "@/utils/createBreakpoints.utils"
