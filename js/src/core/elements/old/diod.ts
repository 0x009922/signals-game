import { CompositorElement, SignalsContext } from '@/core/heap';
import { computed, ComputedRef, ref, watch } from 'vue';

export interface ElemDiod extends CompositorElement {
    active: ComputedRef<boolean>;
}

export function useElemDiod(): ElemDiod {
    const active = ref(false);

    const use_context = (ctx: SignalsContext) => {
        watch(
            ctx.received_signals,
            (signals) => {
                active.value = signals.length > 0;
            },
            { immediate: true },
        );
    };

    const unmounted = () => {};

    return {
        active: computed(() => active.value),
        use_context,
        unmounted,
    };
}
