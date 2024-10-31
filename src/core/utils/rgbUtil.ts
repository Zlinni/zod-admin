export const RGB = {
  with: (color: string) => {
    const len = color.split(',').length - 1
    return len === 3 ? `rgba(${color})` : `rgb(${color})`
  },
  A: (color: string, opactiy?: number) => {
    return `rgba(${color}${opactiy ? ',' + opactiy : ''})`
  },
  values: (colorString: string) => {
    const rgbRegex =
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    const match = colorString.match(rgbRegex)
    if (!match) {
      return null
    }
    const [r, g, b, a] = match.slice(1, 5).map(Number)
    return [r, g, b, a]
  },
  toHex(colorString: string) {
    const colorArr = this.values(colorString)
    if (colorArr) {
      const [r, g, b, a] = colorArr
      return `#${toHexStr(r)}${toHexStr(g)}${toHexStr(b)}${a === 1 ? '' : toHexStr(Math.floor(a * 255))}`
    }
  },
}
const toHexStr = (n: number) => `${n > 15 ? '' : 0}${n.toString(16)}`
