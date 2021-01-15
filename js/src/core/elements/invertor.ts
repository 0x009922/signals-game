import { Direction } from '@/core/heap';
import { computed, ComputedRef, ref } from 'vue';
import { ChipSetup } from '@/core/heap';

export interface ElemInvertor {
    outputDir: ComputedRef<Direction>;
    outputActive: ComputedRef<boolean>;
    setOutputDir: (val: Direction) => void;
}

export const setupInvertor: ChipSetup<ElemInvertor> = (ctx) => {
    const outputDir = ref<Direction>(Direction.Right);
    const setOutputDir = (val: Direction) => {
        outputDir.value = val;
    };

    const outputActive = computed<boolean>(() => {
        return ctx.received.value.some((x) => x.dir === outputDir.value);
    });

    ctx.setEmitted(computed(() => (outputActive.value ? [{ dir: outputDir.value, step: 1 }] : [])));

    return {
        outputActive,
        setOutputDir,
        outputDir: computed(() => outputDir.value),
    };
};
