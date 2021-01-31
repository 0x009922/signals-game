import { ref, Ref, ComputedRef, reactive, readonly, computed } from 'vue';
import { ChipSetupContext, ReceivedSignal, SignalMove } from '../heap';

export function useContextMock(): {
    ctx: ChipSetupContext;
    received: Ref<ReceivedSignal[]>;
    emitted: ComputedRef<SignalMove[]>;
} {
    const received = ref<ReceivedSignal[]>([]);
    const emittedWrapper = reactive<{ val: SignalMove[] }>({ val: [] });
    const emitted = computed(() => emittedWrapper.val);

    const ctx: ChipSetupContext = {
        received: computed(() => received.value),
        emitted: (getter) => {
            emittedWrapper.val = (computed(getter) as unknown) as SignalMove[];
        },
    };

    return {
        ctx,
        received,
        emitted,
    };
}
