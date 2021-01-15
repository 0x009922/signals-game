import { ComputedRef, Ref } from 'vue';

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

// /**
//  * @todo возможно стоит сюда включить и специальный линкер-утилиту, который бы можно было использовать
//  * для привязки к вотчам и прочему
//  */
// export interface SignalsContext {
//     /**
//      * Устанавливает, какое у сигнала излучение, то есть куда и насколько он излучает сигнал
//      */
//     // set_self_emitting: (signals: SignalMove[]) => void;
//     // Или лучше реактивный массив, который можно менять?
//     // emitted_signals: EmittedSignal[];
//     emitted_signals: Ref<EmittedSignal[]>;

//     // // Реактивный массив входящих в элемент сигналов - только для чтения, разумеется.
//     // // readonly received_signals: ReceivedSignal[];
//     readonly received_signals: Ref<ReceivedSignal[]>;
// }

// export interface UtilizeSignalsContext {
//     use_context(ctx: SignalsContext): void;
// }

// export interface UnmountHook {
//     unmounted(): void;
// }

// type ComposableUtilizer = UtilizeSignalsContext & UnmountHook;

// interface ElementPosition {
//     to_str(this: ElementPosition): string;
//     from_str(str_pos: string): ElementPosition;
//     move(how: SignalMove): ElementPosition;
// }

// // class ElementPosition {}

// /**
//  * Это уже реализация чего-то конкретного
//  */
// class ElementPosition {
//     static from_key(key: string): ElementPosition {}

//     x: number;

//     y: number;

//     public constructor(x: number, y: number) {}

//     to_key(): string {}

//     // move(how: SignalMove) {}
// }

// abstract class A {
//     public abstract to_str(): string;

//     public abstract move(how: SignalMove): A;

//     public abstract static s();
// }

export interface Vector2 {
    x: number;
    y: number;
}

export type ChipSetup<T> = (ctx: ChipSetupContext) => T;

export interface ChipSetupContext {
    received: Ref<ReceivedSignal[]>;
    emitted: (getter: () => EmittedSignal[]) => void;
    // linkCleanCallback: LinkCleanCallbacks;
}

export type LinkCleanCallbacks = (cb: () => void) => void;

export interface Silicon<T> {
    mount: <P extends T>(pos: Vector2, setup: ChipSetup<P>) => P;
    unmount: (pos: Vector2) => void;
    elems: ComputedRef<Array<{ pos: Vector2; elem: T }>>;
}

/**
 * Среда, через которую проходят сообщения. Через неё регулируются все отложенные взаимодействия
 */
export interface Environment {
    dispatch: (action: () => void) => void;
}
