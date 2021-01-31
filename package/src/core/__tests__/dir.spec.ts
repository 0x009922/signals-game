import { oppositeDirection } from '../dir';
import { Direction } from '../heap';

describe('dir tools', () => {
    describe('opposite()', () => {
        [
            [Direction.Up, Direction.Down],
            [Direction.Left, Direction.Right],
        ].forEach(([a, b]) => {
            [
                [a, b],
                [b, a],
            ].forEach(([a, b]) => {
                it(`${a} -> ${b}`, () => {
                    expect(oppositeDirection(a)).toEqual(b);
                });
            });
        });
    });
});
