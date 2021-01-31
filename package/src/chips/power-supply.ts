import { Direction, ChipSetup } from '@/core/heap';
import { computed, ComputedRef, ref } from 'vue';
import { ChipBase } from './heap';

export interface PowerSupplyChip extends ChipBase<'POWER_SUPPLY'> {
    enabled: ComputedRef<boolean>;
    on: () => void;
    off: () => void;
    toggle: () => void;
    setEnabled: (val: boolean) => void;
}

export const setupPowerSupply: ChipSetup<PowerSupplyChip> = (ctx) => {
    const active = ref(false);

    function on() {
        active.value = true;
    }

    function off() {
        active.value = false;
    }

    function toggle() {
        active.value = !active.value;
    }

    function setEnabled(val: boolean) {
        active.value = val;
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
        enabled: computed(() => active.value),
        on,
        off,
        toggle,
        setEnabled,
    };
};
