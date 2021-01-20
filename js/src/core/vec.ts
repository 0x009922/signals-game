import { Vector2Like } from './heap';

export class Vector2 implements Vector2Like {
    public static copy(val: Vector2Like): Vector2 {
        return new Vector2(val.x, val.y);
    }

    public static zero(): Vector2 {
        return new Vector2(0, 0);
    }

    public static fromKey(key: string): Vector2 {
        const [x, y] = key.split(' ').map(Number);
        return new Vector2(x, y);
    }

    public x: number;

    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public add(vec: Vector2Like): Vector2 {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    public sub(vec: Vector2Like): Vector2 {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    public mulScalar(v: number): Vector2 {
        this.x *= v;
        this.y *= v;
        return this;
    }

    public divideScalar(v: number): Vector2 {
        return this.mulScalar(1 / v);
    }

    public negate(): Vector2 {
        return this.mulScalar(-1);
    }

    public toKey(): string {
        return `${this.x} ${this.y}`;
    }

    public setFromCoords(x: number, y: number): Vector2 {
        this.x = x;
        this.y = y;
        return this;
    }

    public setFromVec(vec: Vector2Like): Vector2 {
        this.setFromCoords(vec.x, vec.y);
        return this;
    }
}

// export function vec_to_key(vec: Vector2Like): string {
//     return `${vec.x} ${vec.y}`;
// }

// export function key_to_vec(key: string): Vector2Like {
//     const [x, y] = key.split(' ').map(Number);
//     return { x, y };
// }

// export function add(a: Vector2Like, b: Vector2Like): Vector2Like {
//     return {
//         x: a.x + b.x,
//         y: a.y + b.y,
//     };
// }

// export function mulScalar(vec: Vector2Like, num: number): Vector2Like {
//     return {
//         x: vec.x * num,
//         y: vec.y * num,
//     };
// }

// остальные утилиты
