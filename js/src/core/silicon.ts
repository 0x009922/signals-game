import { computed, ComputedRef, reactive, ref, Ref, shallowReactive, UnwrapRef, watch, watchEffect } from 'vue';
import deepEqual from 'fast-deep-equal';
import {
    Silicon,
    ChipSetup,
    ChipSetupContext,
    Vector2,
    ReceivedSignal,
    SignalMove,
    Direction,
    Environment,
} from './heap';
import { add, key_to_vec, mulScalar, vec_to_key } from './vec';

interface Cell<T> {
    elem: T;
    emitted: Ref<SignalMove[]>;
    // key: string;
    // pos: Vector2;
}

type ElemsMap<T> = Map<string, Cell<T>>;

export interface SiliconParams {
    env: Environment;
}

export function useSilicon<T>(params: SiliconParams): Silicon<T> {
    // карта с самими элементами
    const elemsMap = shallowReactive<ElemsMap<T>>(new Map());
    const elemsList = computed<Array<{ pos: Vector2; elem: T }>>(() => {
        return [...elemsMap.entries()].map(([key, { elem }]) => ({ pos: key_to_vec(key), elem }));
    });

    const mount = <P extends T>(pos: Vector2, setup: ChipSetup<P>) => {
        const key = vec_to_key(pos);

        if (elemsMap.has(key)) {
            throw new Error('Already mounted to this position');
        }

        const received = receivedInPos(elemsMap, pos);
        const receivedAfterEnv = useEnvRef({
            source: received,
            env: params.env,
            initVal: [],
        });
        const emittedWrapper = reactive<{ val: SignalMove[] }>({ val: [] });
        const emitted = computed<SignalMove[]>(() => emittedWrapper.val);
        const setEmitted = (getter: () => SignalMove[]) => {
            emittedWrapper.val = (computed(getter) as unknown) as SignalMove[];
        };

        // watchEffect(() => {
        //     console.log(`Received in ${key}:`, received.value);
        // });

        const ctx: ChipSetupContext = {
            received: receivedAfterEnv,
            emitted: setEmitted,
            // linkCleanCallback: () => {},
        };
        const elem = setup(ctx);

        elemsMap.set(key, { elem, emitted });

        return elem;
    };

    const unmount = (pos: Vector2) => {
        const key = vec_to_key(pos);
        if (!elemsMap.delete(key)) {
            throw new Error('No element');
        }
    };

    return {
        elems: elemsList,
        mount,
        unmount,
    };
}

function receivedInPos<T>(map: ElemsMap<T>, pos: Vector2): ComputedRef<ReceivedSignal[]> {
    // беру карту и прохожу по всем элементам
    // транслирую их исходящие сигналы и коллекционирую их, если они приходят куда надо
    const targetKey = vec_to_key(pos);

    return computed<ReceivedSignal[]>(() => {
        return [...map.entries()].reduce<ReceivedSignal[]>((received, [key, cell]) => {
            // где нахожусь?
            const pos = key_to_vec(key);

            // получаю позиции, куда исходит сигнал
            cell.emitted.value
                .map((move) => {
                    const moved = moveSignal(pos, move);
                    const movedKey = vec_to_key(moved);
                    // console.log(`From ${key} emitted to ${movedKey} (check for ${targetKey})`);

                    return { move, target: moved, targetKey: movedKey };
                })
                .forEach((x) => {
                    if (x.targetKey === targetKey) {
                        received.push({ dir: x.move.dir });
                    }
                });

            return received;
        }, []);
    });
}

const MOVES: {
    [K in Direction]: [number, number];
} = {
    [Direction.Up]: [0, 1],
    [Direction.Down]: [0, -1],
    [Direction.Left]: [-1, 0],
    [Direction.Right]: [1, 0],
};

function moveSignal(from: Vector2, move: SignalMove): Vector2 {
    const [x, y] = MOVES[move.dir];
    const moveVec = mulScalar({ x, y }, move.step);
    return add(from, moveVec);
}

function useEnvRef<T>(params: { source: Ref<T>; env: Environment; initVal?: T }): Ref<UnwrapRef<T>> {
    const afterEnv = ref(params.initVal ?? params.source.value);
    // const equals = computed<boolean>(() => deepEqual(afterEnv.value, params.source.value));
    let lastValue = afterEnv.value as T;

    watch(
        params.source,
        (val) => {
            // console.log('WATCH (OLD CURR)', JSON.stringify(lastValue), JSON.stringify(val));
            if (!deepEqual(lastValue, val)) {
                // console.log('Catch it!');
                lastValue = val;
                params.env.dispatch(() => {
                    afterEnv.value = val as UnwrapRef<T>;
                });
            }
            // console.log('watch', val);
            // params.env.dispatch(() => {
            //     if (!deepEqual(val, afterEnv.value)) {
            //         console.log('SET (from => to)', afterEnv.value, val);
            //         afterEnv.value = val as UnwrapRef<T>;
            //     }
            // });
        },
        { immediate: true, flush: 'sync' },
    );

    return afterEnv;
}
