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
        <rect
            x="25"
            y="25"
            width="50"
            height="50"
            fill="transparent"
            stroke-width="2"
            :stroke="active ? 'lime' : '#004400'"
            stroke-linejoin="bevel"
        />
        <text
            x="50%"
            y="50%"
            :fill="active ? 'lime' : '#004400'"
            class="font-mono"
            font-size="25"
            alignment-baseline="middle"
            text-anchor="middle"
        >
            {{ active ? 1 : 0 }}
        </text>
        <!-- <rect width="100%" height="100%" fill="#002200" />
        <circle cx="50" cy="50" r="20" :stroke="active ? 'lime' : 'green'" stroke-width="4" fill="transparent" /> -->
    </svg>
</template>

<style lang="sass" scoped>
text, rect
    transition: all .2s ease
</style>
