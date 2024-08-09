import isObject from "myUtilities/src/utils/isObject"

type JoinProperties<T, U> = {
    props: T & object;
    replaceProps: U & Object
};

const joinProperties = <T, U>({ props, replaceProps }: JoinProperties<T, U>): T & U => {

    const combinedProps: any = props

    for (const key in replaceProps) {
        const currentPrimary = props?.[key as keyof T];
        const currentSecondary = replaceProps[key as keyof U];
       
        if (isObject(currentPrimary) && isObject(currentSecondary)) {
            combinedProps[key] = { ...currentPrimary, ...currentSecondary }
        } else if (Array.isArray(currentPrimary) && Array.isArray(currentSecondary)) {
            combinedProps[key] = [...currentPrimary, ...currentSecondary]
        } else {
            combinedProps[key] = currentSecondary 
        }
    }
    return combinedProps
};

export default joinProperties;

