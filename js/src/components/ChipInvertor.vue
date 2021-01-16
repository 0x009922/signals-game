<script lang="ts">
import { InvertorChip } from '@/chips/invertor';
import { Direction } from '@/core/heap';
import { computed, defineComponent, PropType, watchEffect } from 'vue';

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

        const COLOR_ON = 'lime';
        const COLOR_OFF = 'green';

        const inputColor = computed(() => (outputActive.value ? COLOR_OFF : COLOR_ON));
        const outputColor = computed(() => (outputActive.value ? COLOR_ON : COLOR_OFF));

        const order = [Direction.Right, Direction.Down, Direction.Left, Direction.Up];
        const rotate = computed(() => {
            const index = order.indexOf(outputDir.value);
            return `rotate(${index * 90} 50 50)`;
        });

        function toggleDir() {
            const index = order.indexOf(outputDir.value);
            setOutputDir(order[(index + 1) % 4]);
        }

        return {
            outputColor,
            inputColor,
            rotate,
            toggleDir,
        };
    },
});
</script>

<template>
    <svg width="100%" height="100%" viewBox="0 0 100 100">
        <g stroke-width="2" stroke-linecap="round" fill="transparent" :transform="rotate">
            <polygon points="60,50 30,30 30,70" :stroke="inputColor" />
            <circle cx="72" cy="50" r="10" :stroke="outputColor" />
        </g>

        <rect
            width="100"
            height="100"
            fill="transparent"
            stroke="transparent"
            class="cursor-pointer"
            @click="toggleDir"
        />
    </svg>
</template>
