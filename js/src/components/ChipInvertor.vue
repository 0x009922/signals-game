<script lang="ts">
import { InvertorChip } from '@/chips/invertor';
// import { Direction } from '@/core/heap';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'ChipPowerSupply',
    props: {
        chip: {
            type: Object as PropType<InvertorChip>,
            required: true,
        },
    },
    setup(props) {
        const { outputDir, outputActive, setOutputDir } = props.chip;
        // console.log(Direction);

        return {
            // outputDir,
            outputActive,
        };
    },
});
</script>

<template>
    <div class="w-full h-full flex items-center justify-center font-mono text-sm">
        {{ outputActive ? '1 -> 0' : '0 -> 1' }}
    </div>
</template>
