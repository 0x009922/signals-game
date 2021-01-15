import { computed, Ref } from 'vue';
import { ChipSetup } from '@/core/heap';
import { ChipBase } from './heap';

export interface SensorChip extends ChipBase<'SENSOR'> {
    active: Ref<boolean>;
}

export const setupSensor: ChipSetup<SensorChip> = (ctx) => {
    const active = computed<boolean>(() => ctx.received.value.length > 0);

    return {
        chip: 'SENSOR',
        active,
    };
};
