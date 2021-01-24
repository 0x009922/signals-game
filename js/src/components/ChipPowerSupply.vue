<script lang="ts">
import { PowerSupplyChip } from '@/chips/power-supply';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'ChipPowerSupply',
    props: {
        chip: {
            type: Object as PropType<PowerSupplyChip>,
            required: true,
        },
    },
    setup(props) {
        const { enabled, toggle } = props.chip;

        // useCustomKeys({
        //     KeyE: {
        //         label: 'E',
        //         description: 'on/off',
        //         down: () => toggle(),
        //     },
        // });

        return {
            enabled,
            toggle,
        };
    },
});
</script>

<template>
    <svg width="100%" height="100%" viewBox="0 0 100 100">
        <text fill="white" x="10" y="20">Power</text>
        <text :fill="enabled ? 'blue' : '#000088'" font-size="2em" x="20" y="50" dy="15">
            {{ enabled ? 'ON' : 'OFF' }}
        </text>

        <rect
            width="100%"
            height="100%"
            stroke="#000050"
            stroke-width="15"
            fill="transparent"
            class="cursor-pointer"
            @click="toggle"
        ></rect>
    </svg>
</template>
