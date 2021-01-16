<script lang="ts">
import { Component, defineComponent, ref, computed, reactive } from 'vue';
import { AppChips, useAppStore } from '@/state';
import ChipPowerSupply from './ChipPowerSupply.vue';
import ChipSensor from './ChipSensor.vue';
import ChipInvertor from './ChipInvertor.vue';
import { Vector2 } from '@/core/heap';
import ChipBufferVue from './ChipBuffer.vue';
import SiliconGridSvg from './SiliconGridSvg.vue';

export default defineComponent({
    name: 'SiliconGrid',
    components: { SiliconGridSvg },
    setup() {
        const {
            silicon: { elems },
        } = useAppStore();

        function resolveChipComponent(elem: AppChips): Component {
            switch (elem.chip) {
                case 'SENSOR':
                    return ChipSensor;
                case 'POWER_SUPPLY':
                    return ChipPowerSupply;
                case 'INVERTOR':
                    return ChipInvertor;
                case 'BUFFER':
                    return ChipBufferVue;
                default:
                    throw new Error(`Unknown chip`);
            }
        }

        return {
            elems,
            resolveChipComponent,
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
