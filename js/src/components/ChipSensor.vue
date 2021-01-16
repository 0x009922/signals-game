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
    <svg width="100%" height="100%" viewBox="0 0 100 100">
        <rect width="100%" height="100%" fill="#002200" />
        <circle cx="50" cy="50" r="20" :stroke="active ? 'lime' : 'green'" stroke-width="4" fill="transparent" />
    </svg>
</template>

<style lang="sass" scoped>
circle
    transition: all .15s ease
</style>
