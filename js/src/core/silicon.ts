import { computed, reactive } from 'vue';
import { Silicon, SiliconElementSetup, SiliconElementSetupContext, Vector2 } from './heap';
import { vec_to_key } from './vec';

interface Cell<T> {
    elem: T;
    key: string;
    pos: Vector2;
}

export function useSilicon<T>(): Silicon<T> {
    const map = reactive<Map<string, Cell<T>>>(new Map());
    const elems = computed<Array<{ pos: Vector2; elem: T }>>(() => {
        return [...map.values()].map(({ pos, elem }) => ({ pos, elem }));
    });

    const mount = (pos: Vector2, setup: SiliconElementSetup<T>) => {
        const key = vec_to_key(pos);

        const ctx = {} as SiliconElementSetupContext;

        map.set(key, { key, pos, elem: setup(ctx) });
    };

    const unmount = (pos: Vector2) => {
        const key = vec_to_key(pos);
        if (!map.delete(key)) {
            throw new Error('No element');
        }
    };

    return {
        elems,
        mount,
        unmount,
    };
}
