export const StyleMapKeys = [
        '&4',
        '&c',
        '&6',
        '&e',
        '&2',
        '&a',
        '&b',
        '&3',
        '&1',
        '&9',
        '&d',
        '&5',
        '&f',
        '&7',
        '&8',
        '&0',
        '&g',
        '&l',
        '&n',
        '&o',
        '&m'] as const;
export type TRequestStyleMap = (typeof StyleMapKeys)[number];
export type TStyleMap = Record<TRequestStyleMap, string>;