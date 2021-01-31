import { Direction } from './heap';

export const DIRECTIONS = [Direction.Down, Direction.Left, Direction.Right, Direction.Up];

export const OPPOSITE_DIRECTION_MAP: Record<Direction, Direction> = {
    [Direction.Down]: Direction.Up,
    [Direction.Up]: Direction.Down,
    [Direction.Left]: Direction.Right,
    [Direction.Right]: Direction.Left,
};

export function oppositeDirection(val: Direction): Direction {
    return OPPOSITE_DIRECTION_MAP[val];
}

// export function isOpposite(a: Direction, b: Direction): boolean {}
