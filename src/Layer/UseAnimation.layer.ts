import { cssAdapter } from "@/adapter/css/css.adapter.js";
import { AnimateProperties, AnimateComponentProps } from "@/types/animate.type";
import { HTMLResponsiveComponent } from "@/types/responsive.type";
import resetAnimate from "@/utils/resetAnimate.utils.js";
import { MotionComponentProps } from "@/components/MotionComponent";
import { useEffect, useMemo, useRef } from "react";


/**
 * @description
 * El hook `useAnimationLayer` adapta animaciones para asegurar consistencia y fluidez en los componentes. Utiliza 
 * `cssAdapter` para estandarizar las propiedades de animación, garantizando que se apliquen correctamente.
 *
 * **Funcionalidad:**
 * - @Consistencia :  Asegura que todas las animaciones se apliquen de manera uniforme.
 * - @Adaptación : Transforma propiedades de animación en un formato uniforme usando `cssAdapter`.
 * - @Optimización : Utiliza `useMemo` para evitar recalculaciones innecesarias y `useEffect` para actualizar la caché de animaciones.
 *
 * Beneficio : Garantiza que las animaciones se comporten de manera predecible y suave, evitando problemas de inconsistencias.
 */

type AnimationLayerProps<T extends HTMLResponsiveComponent> = {
    lastestBreakPoint?: string
} & AnimateComponentProps<T>

function useAnimationLayer<T extends HTMLResponsiveComponent>(props: Omit<AnimationLayerProps<T>, "as">): AnimateComponentProps<T>
function useAnimationLayer<T extends HTMLResponsiveComponent>(props: Omit<MotionComponentProps<T>, "as">): AnimateComponentProps<T>


function useAnimationLayer<T extends HTMLResponsiveComponent>({ lastestBreakPoint, ...props }: AnimationLayerProps<T>) {

    const {
        style,
        animate,
        initial,
        whileHover,
        whileFocus,
        whileDrag,
        whileInView,
        whileTap
    } = props;

    const adapters = {
        whileHover: cssAdapter(whileHover),
        whileDrag: cssAdapter(whileDrag),
        whileTap: cssAdapter(whileTap),
        style: cssAdapter(style),
        initial: cssAdapter(initial),
        animate: cssAdapter(animate),
        whileFocus: cssAdapter(whileFocus),
        whileInView: cssAdapter(whileInView),
    }

    const reseteableProperties = useRef<AnimateProperties>({})

    const resetAnimations = useMemo(() => {
        const ref = reseteableProperties.current
        const filterStyledProperties = Object.entries(ref).filter(([key]) => !(key in adapters.style))
        const res = resetAnimate(Object.fromEntries(filterStyledProperties))
        return res
    }, [lastestBreakPoint])


    useEffect(() => {
        if (!lastestBreakPoint) return
        const { animate, whileFocus, whileInView, whileHover, whileDrag, whileTap } = adapters
        for (const value of [animate, whileInView, whileHover, whileDrag, whileTap, whileFocus]) {
            Object.assign(reseteableProperties.current, value)
            /**
             * Almacenamos las propiedades para el breakponint posterior,
             * para que la propiedad animate reciba todas las animaciones(whileDrag,whileTap,animate...) que se aplicaron y pueda darle un valor por defecto.
             * **/
        }
    }, [lastestBreakPoint]);



    return {
        ...props,
        ...adapters,
        animate: { ...resetAnimations, ...adapters.animate }
    }

}


export default useAnimationLayer
