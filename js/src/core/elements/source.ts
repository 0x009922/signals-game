import { Direction } from '@/core/heap';
import { computed, ComputedRef, ref } from 'vue';
import { SiliconElementSetup } from '@/core/heap';

interface ElemSource {
    active: ComputedRef<boolean>;
    on: () => void;
    off: () => void;
}

export const setupSource: SiliconElementSetup<ElemSource> = (ctx) => {
    const active = ref(false);
    const on = () => (active.value = true);
    const off = () => (active.value = false);

    ctx.setEmitted(
        computed(() => {
            return active.value
                ? [
                      { step: 1, dir: Direction.Left },
                      { step: 1, dir: Direction.Up },
                      { step: 1, dir: Direction.Right },
                      { step: 1, dir: Direction.Down },
                  ]
                : [];
        }),
    );

    return {
        on,
        off,
        active: computed(() => active.value),
    };
};
