import { computed, Ref } from 'vue';
import { ChipSetup } from '@/core/heap';

export interface LuminodiodeChip {
    active: Ref<boolean>;
}

export const setupLuminodiode: ChipSetup<LuminodiodeChip> = (ctx) => {
    const active = computed<boolean>(() => ctx.received.value.length > 0);

    return {
        active,
    };
};
