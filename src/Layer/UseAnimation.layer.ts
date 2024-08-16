import { useEffect, useMemo, useRef } from "react";
import { cssAdapter } from "@responsive-component/adapter/css/css.adapter.js";
import { DefaultProps, HTMLMotionComponents, AnimateProps } from "@responsive-component/props.type.js";
import resetAnimate, { resettableProperties } from "@responsive-component/utils/resetAnimate.utils.js";


/**
 * @responsive-componentdescription
 * El hook `useAnimationLayer` adapta animaciones para asegurar consistencia y fluidez en los componentes. Utiliza 
 * `cssAdapter` para estandarizar las propiedades de animación, garantizando que se apliquen correctamente.
 *
 * **Funcionalidad:**
 * - @responsive-componentConsistencia :  Asegura que todas las animaciones se apliquen de manera uniforme.
 * - @responsive-componentAdaptación : Transforma propiedades de animación en un formato uniforme usando `cssAdapter`.
 * - @responsive-componentOptimización : Utiliza `useMemo` para evitar recalculaciones innecesarias y `useEffect` para actualizar la caché de animaciones.
 *
 * @responsive-componentBeneficio : Garantiza que las animaciones se comporten de manera predecible y suave, evitando problemas de inconsistencias.
 */

type AnimationLayerProps<T extends HTMLMotionComponents> = {
    lastestBreakPoint?: string
} & DefaultProps<T>

const useAnimationLayer = <T extends HTMLMotionComponents>({ lastestBreakPoint, ...props }: AnimationLayerProps<T>) => {

    const {
        style = {},
        animate = {},
        initial = {},
        whileHover = {},
        whileFocus = {},
        whileDrag = {},
        whileInView = {},
        whileTap = {}
    } = props;

    const dependencies = [lastestBreakPoint, JSON.stringify(animate)]

    const ref = useRef<AnimateProps>({})


    const animateAdapter = useMemo(() => cssAdapter(animate), dependencies)
    const styleAdapter = useMemo(() => cssAdapter(style), [JSON.stringify(style)])
    const initialAdapter = useMemo(() => cssAdapter(initial), [JSON.stringify(initial)]);
    const whileHoverAdapter = useMemo(() => cssAdapter(whileHover), [JSON.stringify(whileHover)]);
    const whileFocusAdapter = useMemo(() => cssAdapter(whileFocus), [JSON.stringify(whileFocus)]);
    const whileDragAdapter = useMemo(() => cssAdapter(whileDrag), [JSON.stringify(whileDrag)]);
    const whileInViewAdapter = useMemo(() => cssAdapter(whileInView), [JSON.stringify(whileInView)]);
    const whileTapAdapter = useMemo(() => cssAdapter(whileTap), [JSON.stringify(whileTap)]);

    useEffect(() => {
        if (!lastestBreakPoint) return
        const newCache = resettableProperties({ animate: animateAdapter })
        ref.current = { ...ref.current, ...newCache }
    }, dependencies);

    const reset = useMemo(() => {
        const filterStyledProperties = Object.entries(ref.current).filter(([key]) => !(key in styleAdapter))
        return resetAnimate(Object.fromEntries(filterStyledProperties))
    }, [...dependencies])


    return {
        ...props,
        animate: { ...reset, ...animateAdapter },
        initial: initialAdapter,
        whileHover: whileHoverAdapter,
        whileFocus: whileFocusAdapter,
        whileDrag: whileDragAdapter,
        whileInView: whileInViewAdapter,
        whileTap: whileTapAdapter,
    } as DefaultProps<T> //Si no aplicamos el AS, el proceso de empaquetado no se hara por que no puede inferir algo tan complejo.

}

export default useAnimationLayer
