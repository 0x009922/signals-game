<script lang="ts">
import { Component, defineComponent, ref, computed, reactive } from 'vue';
import { AppChips, useAppStore } from '@/state';
import ChipPowerSupply from './ChipPowerSupply.vue';
import ChipSensor from './ChipSensor.vue';
import ChipInvertor from './ChipInvertor.vue';
import ChipBufferVue from './ChipBuffer.vue';
import SiliconGridSvg from './SiliconGridSvg.vue';
import { Vector2 } from '@/core/vec';
import { Vector2Like } from '@/core/heap';

const ChipComponentsMapped: {
    [K in AppChips['chip']]: Component;
} = {
    SENSOR: ChipSensor,
    POWER_SUPPLY: ChipPowerSupply,
    INVERTOR: ChipInvertor,
    BUFFER: ChipBufferVue,
};

export default defineComponent({
    name: 'SiliconGrid',
    components: { SiliconGridSvg },
    setup() {
        const {
            silicon: { elems },
        } = useAppStore();

        function resolveChipComponent(elem: AppChips): Component {
            return ChipComponentsMapped[elem.chip];
        }

        /**
         * Позиция активна, если в клетке этой позиции находится мышь
         */
        function isPositionActive(pos: Vector2Like): boolean {}

        return {
            elems,
            resolveChipComponent,
            isPositionActive,
        };
    },
});
</script>

<template>
    <div class="w-screen h-screen p-4 silicon-grid">
        <div class="border border-blue-900 h-full box-content">
            <silicon-grid-svg>
                <template v-for="{ pos, elem } in elems" :key="`${pos.x} ${pos.y}`">
                    <svg :x="pos.x" :y="-pos.y" width="1" height="1">
                        <component :is="resolveChipComponent(elem)" :chip="elem" />
                    </svg>
                </template>
            </silicon-grid-svg>
        </div>
    </div>
</template>

<style lang="sass">
.silicon-grid
    background: #000020
</style>
