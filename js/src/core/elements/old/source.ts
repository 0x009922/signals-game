import { CompositorElement, Direction, SignalsContext } from '@/core/heap';
import { computed, ComputedRef, ref, watch } from 'vue';

// import { Direction } from "@/core/heap";

interface ElemSource extends CompositorElement {
    active: ComputedRef<boolean>;
    on: () => void;
    off: () => void;
}

export function useElemSource(): ElemSource {
    const active = ref(false);

    const on = () => (active.value = true);
    const off = () => (active.value = false);

    const use_context = (ctx: SignalsContext) => {
        watch(
            active,
            (flag) => {
                ctx.emitted_signals.value = flag
                    ? [
                          { dir: Direction.Left, step: 1 },
                          { dir: Direction.Up, step: 1 },
                          { dir: Direction.Right, step: 1 },
                          { dir: Direction.Down, step: 1 },
                      ]
                    : [];
            },
            { immediate: true },
        );
    };

    const unmounted = () => {};

    return {
        active: computed(() => active.value),
        on,
        off,
        use_context,
        unmounted,
    };
}
