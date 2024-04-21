export const selectColor = "#488bc7"

export const offBlack = "#292929"

export function lightenHexColor(hex: string, amount: number): string {
    const hexValue = hex.startsWith("#") ? hex.slice(1) : hex;
    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);

    // Calculate lighter color
    const newR = Math.min(255, r + Math.floor((255 - r) * amount));
    const newG = Math.min(255, g + Math.floor((255 - g) * amount));
    const newB = Math.min(255, b + Math.floor((255 - b) * amount));

    return "#" + newR.toString(16).padStart(2, "0") + newG.toString(16).padStart(2, "0") + newB.toString(16).padStart(2, "0");
}