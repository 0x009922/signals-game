import { Direction } from '@/core/heap';

const KEY_DIR: [string, Direction][] = [
    ['W', Direction.Up],
    ['A', Direction.Left],
    ['S', Direction.Down],
    ['D', Direction.Right],
];

export const KEYS: { code: string; label: string; dir: Direction }[] = KEY_DIR.map(([key, dir]) => ({
    code: `Key${key}`,
    label: key,
    dir,
}));
