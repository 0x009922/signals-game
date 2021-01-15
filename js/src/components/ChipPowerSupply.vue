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

        return {
            enabled,
            toggle,
        };
    },
});
</script>

<template>
    <div class="w-full select-none h-full cursor-pointer flex items-center justify-center" @click="toggle">
        <div
            :class="{
                'text-4xl text-gray-500': true,
                'text-green-700': enabled,
            }"
        >
            +
        </div>
    </div>
</template>
