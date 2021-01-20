import { computed, ComputedRef, ref } from 'vue';
import { Direction, Silicon, ChipSetup, Vector2Like, Environment } from '../heap';
import { useLightningEnvironment } from '../lightning-env';
import { useSilicon } from '../silicon';

/**
 * Фабрика кремния
 *
 * Можно указывать свой env. Если не указан, используется моментальная диспетчеризация
 */
function siliconFactory<T>(params?: { env?: Environment }): Silicon<T> {
    return useSilicon({
        env: params?.env ?? useLightningEnvironment(),
    });
}

function mockEnvironment(): { env: Environment; dispatchMock: jest.Mock } {
    const dispatchMock = jest.fn().mockImplementation((cb) => cb());

    return {
        env: { dispatch: dispatchMock },
        dispatchMock,
    };
}

describe('silicon', () => {
    describe('монтаж', () => {
        it('изначально элементов нет', () => {
            const { elems } = siliconFactory();

            expect(elems.value).toHaveLength(0);
        });

        it('элемент появляется после монтировки', () => {
            const { elems, mount } = siliconFactory();
            const setup: ChipSetup<string> = () => 'Hey!';
            const pos: Vector2Like = { x: 1, y: 5 };

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
            const setup: ChipSetup<string> = () => 'Hey!';
            const pos: Vector2Like = { x: 1, y: 5 };

            mount(pos, setup);
            unmount(pos);

            expect(elems.value).toEqual([]);
        });

        it('демонтирование того, чего нет - ошибка', () => {
            const { unmount } = siliconFactory();

            expect(() => unmount({ x: 4, y: 1 })).toThrow();
        });

        it('повторное монтирование в занятую точку - ошибка', () => {
            const { mount } = siliconFactory();
            const doMount = () => mount({ x: 5, y: 4 }, () => {});

            doMount();
            expect(doMount).toThrow();
        });
    });

    describe('проведение сигналов', () => {
        const setupSomeReceiver: ChipSetup<{ ok: ComputedRef<boolean> }> = ({ received }) => ({
            ok: computed<boolean>(() => received.value.length > 0),
        });

        it('один излучает, другой получает', () => {
            const { mount } = siliconFactory();

            mount({ x: 0, y: 0 }, ({ emitted }) => {
                emitted(() => [{ dir: Direction.Right, step: 1 }]);
            });
            const { ok } = mount({ x: 1, y: 0 }, setupSomeReceiver);

            expect(ok.value).toEqual(true);
        });

        it('один излучает, другой не получает - не туда излучение', () => {
            const { mount } = siliconFactory();
            mount({ x: 0, y: 0 }, ({ emitted }) => {
                emitted(() => [{ dir: Direction.Left, step: 1 }]);
                //                              ^
            });
            const { ok } = mount({ x: 1, y: 0 }, setupSomeReceiver);

            expect(ok.value).toEqual(false);
        });

        it.skip('излучатель-передатчик-получатель', () => {});
    });

    describe('окружающая среда (диспетчеризация)', () => {
        it('излучение одного сигнала - dispatch один раз', () => {
            const { env, dispatchMock } = mockEnvironment();
            const { mount } = siliconFactory({ env });
            const { emit } = mount({ x: 5, y: 5 }, ({ emitted }) => {
                const val = ref(false);
                function emit() {
                    val.value = true;
                }
                emitted(() => (val.value ? [{ dir: Direction.Right, step: 1 }] : []));
                return { emit };
            });
            mount({ x: 6, y: 5 }, () => {});

            emit();
            // await nextTick();

            expect(dispatchMock).toHaveBeenCalledTimes(1);
        });

        it('в клетку был сигнал - при монтировании туда элемента происходит один вызов', () => {
            const { env, dispatchMock } = mockEnvironment();
            const { mount } = siliconFactory({ env });

            // излучатель
            mount({ x: 5, y: 10 }, ({ emitted }) => emitted(() => [{ dir: Direction.Up, step: 1 }]));
            expect(dispatchMock).toHaveBeenCalledTimes(0);
            // получатель
            mount({ x: 5, y: 11 }, () => {});
            expect(dispatchMock).toHaveBeenCalledTimes(1);
        });

        it('в клетку нет сигнала. монтируется излучатель, случается вызов', () => {
            const { env, dispatchMock } = mockEnvironment();
            const { mount } = siliconFactory({ env });

            // получатель
            mount({ x: 5, y: 11 }, () => {});
            expect(dispatchMock).toHaveBeenCalledTimes(0);
            // излучатель
            mount({ x: 5, y: 10 }, ({ emitted }) => emitted(() => [{ dir: Direction.Up, step: 1 }]));
            expect(dispatchMock).toHaveBeenCalledTimes(1);
        });

        it('сигнал выключается и включается - два вызова', () => {
            const { env, dispatchMock } = mockEnvironment();
            const { mount } = siliconFactory({ env });

            // излучатель
            const { off } = mount({ x: 5, y: 10 }, ({ emitted }) => {
                const active = ref(true);
                emitted(() => (active.value ? [{ dir: Direction.Up, step: 1 }] : []));
                return {
                    off() {
                        active.value = false;
                    },
                };
            });
            // получатель
            mount({ x: 5, y: 11 }, () => {});

            off();

            expect(dispatchMock).toHaveBeenCalledTimes(2);
        });

        it.skip('излучатель-передатчик-получатель - сигнал переходит последовательно', () => {});

        // it('', () => {});

        // it('', () => {});
    });
});
