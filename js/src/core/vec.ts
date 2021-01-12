import { Vector2 } from './heap';

export function vec_to_key(vec: Vector2): string {
    return `${vec.x} ${vec.y}`;
}

export function key_to_vec(key: string): Vector2 {
    const [x, y] = key.split(' ').map(Number);
    return { x, y };
}

// остальные утилиты
