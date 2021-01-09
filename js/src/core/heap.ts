import { Ref } from 'vue';

export enum Direction {
    Up,
    Down,
    Left,
    Right,
}

// можно для Direction написать associated methods, типа проверки двух направлений на противоположность и так далее

// export enum Orientation {
//     Vertical,
//     Horizontal,
// }

export interface SignalMove {
    /**
     * Куда идёт сигнал
     */
    dir: Direction;
    /**
     * На сколько шагов идёт. Гарантированно положительное число
     */
    step: number;
}

export type EmittedSignal = SignalMove;

export interface ReceivedSignal {
    /**
     * Направление сигнала. Допустим, если это Up, то он входит вверх, то есть снизу входит
     */
    dir: Direction;
}

interface SignalsContext {
    /**
     * Устанавливает, какое у сигнала излучение, то есть куда и насколько он излучает сигнал
     */
    // set_self_emitting: (signals: EmittedSignal[]) => void;
    // Или лучше реактивный массив, который можно менять?
    // emitted_signals: EmittedSignal[];
    emitted_signals: Ref<EmittedSignal[]>;

    // Реактивный массив входящих в элемент сигналов - только для чтения, разумеется.
    // readonly received_signals: ReceivedSignal[];
    readonly received_signals: Ref<ReceivedSignal[]>;
}

interface UtilizeSignalsContext {
    use_context(ctx: SignalsContext): void;
}

interface UnmountHook {
    unmounted(): void;
}

// type ComposableUtilizer = UtilizeSignalsContext & UnmountHook;

interface ElementPosition {
    to_str(this: ElementPosition): string;
    from_str(str_pos: string): ElementPosition;
    move(how: SignalMove): ElementPosition;
}

// /**
//  * Это уже реализация чего-то конкретного
//  */
// class ElementPosition {
//     x: number;

//     y: number;

//     public constructor(x: number, y: number) {

//     }

//     static from_str(str: string): ElementPosition {

//     }

//     to_str(): string {

//     }

//     move(how: SignalMove): ElementPosition {

//     }
// }

// abstract class A {
//     public abstract to_str(): string;

//     public abstract move(how: SignalMove): A;

//     public abstract static s();
// }

interface SignalsUtilizerCompositor<T extends UtilizeSignalsContext & UnmountHook> {
    // private cells: Map<string, CellData>;

    mount(pos: PosToStr, elem: T): void;

    unmount(pos: PosToStr): void;
}
