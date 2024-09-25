import { isObject } from "my-utilities";
import border from "./styles/border.style";
import padding from "./styles/padding.style";
import margin from "./styles/margin.style";
import inset from "./styles/inset.style";
import borderRadius from "./styles/border-radius.style";


/**
 * @description 
 * Esta función ayuda a adaptar las propiedades CSS a la librería @FrameMotion 
 * 
 * 1. Facilita la adaptación de las propiedades CSS según los breakpoints definidos, manteniendo la coherencia al utilizar @FrameMotion y el método ResetAnimate.
 * 
 * 2. Por ejemplo, si tenemos un border-top aplicado en un breakpoint específico, al cambiar a otro breakpoint-
 *    se reseteará a un valor por defecto (ya sea por la implementación de @FrameMotion o @method ResetAnimate ).
 *    Supongamos que tenemos un breakpoint que contiene un border completo.
 *    En este caso, el border se visualizará sin la parte superior, ya que esta se ha reseteado.
 *
 *    En cambio utilizando @method cssAdapter , nos ayudara a adaptar las propiedades según el caso, evitando colisiones con los reseteos de otros breakpoints.
 */

const filterkeys = [
    "border",
    "borderColor",
    "borderStyle",
    "padding",
    "margin",
    "inset",
    "borderRadius",
    ...(["TopLeft", "TopRight", "BottomLeft", "BottomRight"].map(i => `border${i}Radius`))
]

export const cssAdapter = <T extends object>(css?: T): T => {
    if (!css || !isObject(css)) return {} as T


    const restCss = Object.fromEntries(Object.entries(css).filter(([key]) => !filterkeys.includes(key.toString())))
        
    const res = {
        ...borderRadius(css),
        ...inset(css),
        ...border(css),
        ...padding(css),
        ...margin(css),
        ...restCss,
    }

    return res as T
};

