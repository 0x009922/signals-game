import { Direction, ChipSetup } from '@/core/heap';
import { computed, ComputedRef, ref } from 'vue';
import { ChipBase } from './heap';

export interface PowerSupplyChip extends ChipBase<'POWER_SUPPLY'> {
    enabled: ComputedRef<boolean>;
    on: () => void;
    off: () => void;
}

export const setupPowerSupply: ChipSetup<PowerSupplyChip> = (ctx) => {
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
        chip: 'POWER_SUPPLY',
        on,
        off,
        enabled: computed(() => active.value),
    };
};
