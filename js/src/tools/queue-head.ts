import { computed, ComputedRef, reactive, UnwrapRef } from 'vue';

export function useQueueWithHead<T>(): {
    head: ComputedRef<T | null>;
    push: (val: T) => void;
    rm: (val: T) => void;
} {
    const queue = reactive<T[]>([]);
    const head = computed<T | null>(() => (queue[0] as any) ?? null);

    return {
        head,
        push: (val) => {
            queue.push(val as any);
        },
        rm: (val) => {
            const index = queue.indexOf(val as any);
            if (index >= 0) {
                queue.splice(index, 1);
            }
        },
    };
}
