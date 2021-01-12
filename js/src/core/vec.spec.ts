import { Vector2 } from './heap';
import { vec_to_key, key_to_vec } from './vec';

describe('vec utils', () => {
    it('Конвертация обратима', () => {
        const vec: Vector2 = { x: 0, y: 5 };

        const key = vec_to_key(vec);

        expect(key_to_vec(key)).toEqual(vec);
    });
});
