import { colors } from './constants'
import { hexToRGBA } from './hexToRBGA'


describe("HEX TO RGBA function", () => {
    it("returns an array of 4 integers representing the rgba format", () => {
        for (let color of colors)
        {
            const rbga = hexToRGBA(color)
            console.log({ rbga, color })
        }

    })
})