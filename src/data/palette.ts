// Colour-block names (see [data-color] in styles/global.css; use with bg-c / text-ink)
export const blockColors = ['orange', 'lime', 'blue', 'yellow', 'pink', 'purple', 'cyan', 'red', 'cream'] as const;

export const colorFor = (i: number) => blockColors[i % blockColors.length];
