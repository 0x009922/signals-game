import { Direction, ChipSetup } from '@/core/heap';
import { computed, ComputedRef, ref } from 'vue';

export interface InvertorChip {
    outputDir: ComputedRef<Direction>;
    outputActive: ComputedRef<boolean>;
    setOutputDir: (val: Direction) => void;
}

export const setupInvertor: ChipSetup<InvertorChip> = (ctx) => {
    const outputDir = ref<Direction>(Direction.Right);
    const setOutputDir = (val: Direction) => {
        outputDir.value = val;
    };

    const outputActive = computed<boolean>(() => {
        return ctx.received.value.some((x) => x.dir === outputDir.value);
    });

    ctx.emitted(() => (outputActive.value ? [{ dir: outputDir.value, step: 1 }] : []));

    return {
        outputActive,
        setOutputDir,
        outputDir: computed(() => outputDir.value),
    };
};
