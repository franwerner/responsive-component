import { AnimateProps } from "@/props.type";
import getDirections, { Directions } from "./utils/getDirections.utils";
import { MotionStyle } from "framer-motion";

interface IGetProperty {
    property: "margin" | "padding",
    direction: `margin${Directions}` | `padding${Directions}`
}

const paddingAndMargin = <T extends AnimateProps | MotionStyle | (AnimateProps & MotionStyle)>(style: T) => {


    const getProperty = ({ property, direction }: IGetProperty) => {

        if (!style[property] && !style[direction]) return {}
        return {
            [direction]: style[direction] || style[property]
        }
    };

    return getDirections((i) => {
        const paddingDirection = `padding${i}` as const
        const marginDirection = `margin${i}` as const

        return {
            ...getProperty({ property: "padding", direction: paddingDirection }),
            ...getProperty({ property: "margin", direction: marginDirection })
        }

    })
};

export default paddingAndMargin