import { computed, ComputedRef, DeepReadonly, reactive, readonly, ref, Ref, UnwrapRef } from 'vue';
import { ChipSetup, Direction, SignalMove } from '@/core/heap';
import { ChipBase } from './heap';
import { oppositeDirection } from '@/core/dir';

export enum PortType {
    In = 'IN',
    Out = 'OUT',
}

export interface PortStateBase {
    type: PortType;
}

interface PortStateWrapped {
    type: Ref<PortType>;
    active: Ref<boolean>;
}

type PortsWrapped = Record<Direction, PortStateWrapped>;

export type PortState = UnwrapRef<PortStateWrapped>;

/**
 * Чип "буффер". Имеет 4 порта по всем направлениям.
 * Каждый из портов может быть либо входным, либо выходным.
 *
 * Активность входного порта указывает на то, что он на нём принимает сигнал.
 * Активность выходного на то, что из него сигнал исходит.
 */
export interface BufferChip extends ChipBase<'BUFFER'> {
    /**
     * Реактивное состояние портов.
     */
    ports: DeepReadonly<UnwrapRef<PortsWrapped>>;
    setPortType: (dir: Direction, value: PortType) => void;
}

// function portFactory(): PortStateWrapped {
//     return {

//     }
// }

const DIRECTIONS = [Direction.Down, Direction.Left, Direction.Right, Direction.Up];

function directionsMap<T>(fn: (dir: Direction) => T): Record<Direction, T> {
    type P = Record<Direction, T>;

    return DIRECTIONS.reduce<P>(
        (acc, dir) => {
            acc[dir] = fn(dir);
            return acc;
        },
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        {} as P,
    );
}

export const setupBufferChip: ChipSetup<BufferChip> = (ctx) => {
    const portTypeMap = reactive(directionsMap(() => PortType.In));

    function setPortType(dir: Direction, val: PortType) {
        portTypeMap[dir] = val;
    }

    const directionActiveInputMap = computed(() => {
        const map = directionsMap(() => false);
        ctx.received.value.forEach((x) => {
            map[x.dir] = true;
        });

        return map;
    });

    const portActiveInputMap = directionsMap((dir) => {
        // если сигнал входящий имеет dir = Direction.Up, то активируется порт Direction.Down, поскольку
        // входящий означает куда идёт, а не откуда идёт
        const inputPortDir = oppositeDirection(dir);
        return computed(() => portTypeMap[dir] === PortType.In && directionActiveInputMap.value[inputPortDir]);
    });

    /**
     * Буффер активен (то есть принимает сигнал) тогда, когда
     * активен хотя бы один входящий порт
     */
    const bufferActive = computed<boolean>(() => {
        return Object.values(portActiveInputMap).some((x) => x.value);
    });

    const portActiveOutputMap = directionsMap((dir) =>
        computed<boolean>(() => bufferActive.value && portTypeMap[dir] === PortType.Out),
    );

    /**
     * Финальный компендиум
     */
    const ports = directionsMap<PortStateWrapped>((dir) => {
        const type = computed(() => portTypeMap[dir]);
        const active = computed(() => {
            switch (type.value) {
                case PortType.In:
                    return portActiveInputMap[dir].value;
                case PortType.Out:
                    return portActiveOutputMap[dir].value;
                default:
                    throw new Error(`Undefined port type: ${type.value}`);
            }
        });

        return { type, active };
    });

    ctx.emitted(() => {
        if (!bufferActive.value) return [];

        return DIRECTIONS.reduce<SignalMove[]>((acc, dir) => {
            if (portActiveOutputMap[dir].value) {
                acc.push({ dir, step: 1 });
            }
            return acc;
        }, []);
    });

    return {
        chip: 'BUFFER',
        ports: readonly(ports),
        setPortType,
    };
};
