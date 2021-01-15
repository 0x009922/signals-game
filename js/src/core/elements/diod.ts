import { computed, Ref } from 'vue';
import { ChipSetup } from '@/core/heap';

export interface ElemDiod {
    active: Ref<boolean>;
}

export const setupDiod: ChipSetup<ElemDiod> = (ctx) => {
    const active = computed<boolean>(() => ctx.received.value.length > 0);

    return {
        active,
    };
};
