export function hexToRGBA(hex: string) {



    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

    const result = regex.exec(hex)

    if (!result)
    {
        return [-1, -1, -1, -1]
    }
    return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
        255,
    ]

}