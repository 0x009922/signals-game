<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SensorChip } from '@/chips/sensor';

export default defineComponent({
    name: 'ChipPowerSupply',
    props: {
        chip: {
            type: Object as PropType<SensorChip>,
            required: true,
        },
    },
    setup(props) {
        const { active } = props.chip;

        return {
            active,
        };
    },
});
</script>

<template>
    <div class="w-full h-full flex items-center justify-center">
        <div :class="{ 'w-4 h-4 rounded-full border-2': true, 'border-green-600': active }" />
    </div>
</template>
