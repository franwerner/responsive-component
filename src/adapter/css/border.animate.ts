import {isString} from "my-utilities"
import getDirections from "./utils/getDirections.utils"
import { AnimateProps } from "@/props.type"
import { MotionStyle } from "framer-motion"

const searchColor = (input: any) => {
    if(!isString(input)) return
    const res = input.match(/(rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|#(?:[0-9a-fA-F]{3}){1,2})/i)
    return Array.isArray(res) && res[0] 
} 
const searchStyle = (input: any) => {
    if (isString(input)) {
        const res = input.match(/\b[a-zA-Z]+\b(?![^\s])/g) 
        return Array.isArray(res) && res[0]
    }
}

const border = <T extends AnimateProps | MotionStyle | (AnimateProps & MotionStyle)>(css: T) => {

    const borderGlobal = css["border"]
    const borderColorGlobal = css["borderColor"]
    const borderStyleGlobal = css["borderStyle"]

    const searchBorderColor = borderGlobal && searchColor(borderGlobal)
    const searchBorderStyle = borderGlobal && searchStyle(borderGlobal)


    return getDirections((i) => {
        const borderDirection = `border${i}` as const
        if (!css[borderDirection] && !borderGlobal) return

        const borderColorDirection = `${borderDirection}Color` as const
        const borderStyleDirection = `${borderDirection}Style` as const

        return {
            [borderDirection]: css[borderDirection] || borderGlobal,
            [borderColorDirection]: css[borderColorDirection] || searchColor(css[borderDirection]) || borderColorGlobal || searchBorderColor || "#000",
            [borderStyleDirection]: css[borderStyleDirection] || searchStyle(css[borderDirection]) || borderStyleGlobal || searchBorderStyle || "solid"
        }
    }) //Se le aplica el valor que mas especifico sea.
}

export default border