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

export interface EmittedSignal {
    /**
     * Куда идёт сигнал
     */
    dir: Direction;
    step?: number; // по умолчанию 1, должно быть положительное число (иначе ошибка)
    // dy: number;
}

export interface ReceivedSignal {
    /**
     * Направление сигнала. Допустим, если это Up, то он входит вверх, то есть снизу входит
     */
    dir: Direction;
}

interface Context {
    /**
     * Устанавливает, какое у сигнала излучение, то есть куда и насколько он излучает сигнал
     */
    set_self_emitting: (signals: EmittedSignal[]) => void;
    // Или лучше реактивный массив, который можно менять?
    emitted_signals: EmittedSignal[];
    emitted_signals: Ref<EmittedSignal[]>;

    // Реактивный массив входящих в элемент сигналов - только для чтения, разумеется.
    readonly received_signals: ReceivedSignal[];
    readonly received_signals: Ref<ReceivedSignal[]>;
}
