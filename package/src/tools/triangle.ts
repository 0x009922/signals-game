import { Vector2 } from '@/core/vec';

/**
 * Получает угол смещения и радиус, отдаёт вектора равностороннего треугольника.
 *
 * Гарантируется, что одна точка соответствует положению угла.
 */
export function triangleVecs(rad: number, angle: number): Vector2[] {
    const vecs: Vector2[] = [];
    for (let i = 0, a = angle; i < 3; i++, a += (Math.PI * 2) / 3) {
        vecs.push(Vector2.fromPolarCoords(rad, a));
    }
    return vecs;
}
