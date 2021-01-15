import { Vector2 } from './heap';

export function vec_to_key(vec: Vector2): string {
    return `${vec.x} ${vec.y}`;
}

export function key_to_vec(key: string): Vector2 {
    const [x, y] = key.split(' ').map(Number);
    return { x, y };
}

export function add(a: Vector2, b: Vector2): Vector2 {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}

export function mulScalar(vec: Vector2, num: number): Vector2 {
    return {
        x: vec.x * num,
        y: vec.y * num,
    };
}

// остальные утилиты
