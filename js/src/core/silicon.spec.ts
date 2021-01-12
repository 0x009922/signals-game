// import flushPromises from 'flush-promises';
import { Silicon, SiliconElementSetup, Vector2 } from './heap';
import { useSilicon } from './silicon';

function siliconFactory<T>(): Silicon<T> {
    return useSilicon();
}

describe('silicon', () => {
    it('изначально элементов нет', () => {
        const { elems } = siliconFactory();

        expect(elems.value).toHaveLength(0);
    });

    it('элемент появляется после монтировки', () => {
        const { elems, mount } = siliconFactory();
        const setup: SiliconElementSetup = () => 'Hey!';
        const pos: Vector2 = { x: 1, y: 5 };

        mount(pos, setup);

        expect(elems.value).toEqual([
            {
                pos,
                elem: 'Hey!',
            },
        ]);
    });

    it('элемент удаляется при демонтировании', () => {
        const { elems, mount, unmount } = siliconFactory();
        const setup: SiliconElementSetup = () => 'Hey!';
        const pos: Vector2 = { x: 1, y: 5 };

        mount(pos, setup);
        unmount(pos);

        expect(elems.value).toEqual([]);
    });

    it('демонтирование того, чего нет - ошибка', () => {
        const { unmount } = siliconFactory();

        expect(() => unmount({ x: 4, y: 1 })).toThrow();
    });
});
