import { Direction } from './heap';
import { Vector2 } from './vec';

const dirVecs: {
    [K in Direction]: Vector2;
} = {
    [Direction.Down]: new Vector2(0, -1),
    [Direction.Up]: new Vector2(0, 1),
    [Direction.Left]: new Vector2(-1, 0),
    [Direction.Right]: new Vector2(1, 0),
};

export function directionVector(dir: Direction, value: number): Vector2 {
    return Vector2.copy(dirVecs[dir]).mulScalar(value);
}
