import useCreateMotionComponent from "@/hooks/useCreateMotionComponent.hook";
import useAnimationLayer from "@/Layer/UseAnimation.layer";
import useChildrenLayer from "@/Layer/useChildren.layer";
import useResponsiveLayer from "@/Layer/UseResponsive.layer";
import { AnimationVariants, AnimationVariant } from "@/types/animate.type";
import { AdditionalProps, HTMLResponsiveComponent, ResponsiveProps, } from "@/types/responsive.type";
import { AdaptedBreakpoints } from "@/utils/createBreakpoints.utils";
/**
 * @description 
 * No se deben agregar propiedades nuevas entre renderizados. 
 * El `useEffect` que maneja el restablecimiento de las propiedades solo almacena 
 * las propiedades entrantes cuando cambia el breakpoint. 
 * Agregar propiedades nuevas puede generar inconsistencias en el estado, 
 * ya que no detecta cambios en los breakpoints y, por lo tanto, no puede 
 * realizar un restablecimiento y almacenamiento adecuado.
 * 
 * @note 
 * Para hacerlo correctamente, proporciona la propiedad con un valor predeterminado 
 * utilizando una lógica adecuada.
 * Entonces tendremos la propiedad ya almacenada y no generara inconsistencias.
 * 
 * @example
 * const animate = {
 *   // Define propiedades animables aquí 
 *   backgroundColor: state ? "#FF0000" : "#FFF"
 * };
 * 
 * @note
 * Agregar un nuevo breakpoint es permitido, ya que el `useEffect` detectará este cambio correctamente.
 * 
 * @example
 * const responsive: ResponsiveAnimate = {
 *   lg: {
 *     animate: {
 *       backgroundColor: "#FF0000"
 *     },
 *     // ...Otros breakpoints con propiedades animables
 *   }
 * };
 */



type ResponsiveComponentProps<
    T extends HTMLResponsiveComponent = "div",
    U extends AdaptedBreakpoints<any> = never,
    K extends AnimationVariants<any> = never
> =
    Omit<AdditionalProps<T>, "children"> &
    ResponsiveProps<T, U, K>

function ResponsiveComponent<
    T extends HTMLResponsiveComponent = "div",
    U extends AdaptedBreakpoints<any> = never,
    K extends AnimationVariants<any> = never
>(
    props: ResponsiveComponentProps<T, U, K>
) {

    const responsiveProps = useResponsiveLayer(props);
    const childrenProps = useChildrenLayer(responsiveProps)
    const { as = "div", ...rest } = useAnimationLayer(childrenProps)
    const EnhancedComponent = useCreateMotionComponent(as)

    return <EnhancedComponent   {...rest} />
}

export default ResponsiveComponent
export type { ResponsiveComponentProps };
