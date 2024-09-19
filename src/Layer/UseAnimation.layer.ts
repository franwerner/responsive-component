import { cssAdapter } from "@/adapter/css/css.adapter.js";
import { AnimateProps, DefaultProps, HTMLMotionComponents, LiteProps } from "@/types/responsive-component.types";
import resetAnimate from "@/utils/resetAnimate.utils.js";
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

type AnimationLayerProps<T extends HTMLMotionComponents> = {
    lastestBreakPoint?: string
} & DefaultProps<T>

function useAnimationLayer<T extends HTMLMotionComponents>(props: Omit<LiteProps<T>, "as" | "_REF">): DefaultProps<T>
function useAnimationLayer<T extends HTMLMotionComponents>(props: AnimationLayerProps<T>): DefaultProps<T>

function useAnimationLayer<T extends HTMLMotionComponents>({ lastestBreakPoint, ...props }: AnimationLayerProps<T>) {

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

    const reseteableProperties = useRef<AnimateProps>({})

    const resetAnimations = useMemo(() => {
        const ref = reseteableProperties.current
        const filterStyledProperties = Object.entries(ref).filter(([key]) => !(key in adapters.style))
        const res = resetAnimate(Object.fromEntries(filterStyledProperties))
        return res
    }, [lastestBreakPoint])


    useEffect(() => {
        if (!lastestBreakPoint) return
        const { animate, whileFocus, whileInView, whileHover, whileDrag, whileTap } = adapters
        for (const value of [animate, whileInView, whileHover, whileDrag, whileTap,whileFocus]) {
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
