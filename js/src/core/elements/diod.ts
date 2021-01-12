import { computed, Ref } from 'vue';
import { SiliconElementSetup } from '@/core/heap';

export interface ElemDiod {
    active: Ref<boolean>;
}

export const setupDiod: SiliconElementSetup<ElemDiod> = (ctx) => {
    const active = computed<boolean>(() => ctx.received.value.length > 0);

    return {
        active,
    };
};
