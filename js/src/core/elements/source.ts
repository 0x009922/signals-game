import { Direction, ChipSetup } from '@/core/heap';
import { computed, ComputedRef, ref } from 'vue';

interface SourceChip {
    active: ComputedRef<boolean>;
    on: () => void;
    off: () => void;
}

export const setupSource: ChipSetup<SourceChip> = (ctx) => {
    const active = ref(false);

    function on() {
        active.value = true;
    }

    function off() {
        active.value = false;
    }

    ctx.emitted(() =>
        active.value
            ? [
                  { step: 1, dir: Direction.Left },
                  { step: 1, dir: Direction.Up },
                  { step: 1, dir: Direction.Right },
                  { step: 1, dir: Direction.Down },
              ]
            : [],
    );

    return {
        on,
        off,
        active: computed(() => active.value),
    };
};
