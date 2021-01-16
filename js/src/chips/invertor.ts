import { Direction, ChipSetup } from '@/core/heap';
import { computed, ComputedRef, ref } from 'vue';
import { ChipBase } from './heap';

export interface InvertorChip extends ChipBase<'INVERTOR'> {
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
        return !ctx.received.value.some((x) => x.dir === outputDir.value);
    });

    ctx.emitted(() => (outputActive.value ? [{ dir: outputDir.value, step: 1 }] : []));

    return {
        chip: 'INVERTOR',
        outputActive,
        setOutputDir,
        outputDir: computed(() => outputDir.value),
    };
};
