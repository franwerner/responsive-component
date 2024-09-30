
const extractBoxValues = (value: string, index: number):string | undefined => {

    const split = value.trim().split(" ")
    const splitLength = split.length
    if (splitLength == 1) return value
    else if (splitLength == 2) {
        const isNumberPar = (index + 1) % 2 === 0
        return split[isNumberPar ? 1 : 0]
    }
    else if (splitLength == 3 && index <= index || splitLength == 4) return split[index]
};

export default extractBoxValues