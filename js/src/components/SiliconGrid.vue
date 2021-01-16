<script lang="ts">
import { Component, defineComponent, ref, computed, reactive } from 'vue';
import { AppChips, useAppStore } from '@/state';
import ChipPowerSupply from './ChipPowerSupply.vue';
import ChipSensor from './ChipSensor.vue';
import ChipInvertor from './ChipInvertor.vue';
import { Vector2 } from '@/core/heap';
import ChipBufferVue from './ChipBuffer.vue';

export default defineComponent({
    name: 'SiliconGrid',
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

        const zoom = ref(1);
        const width = computed(() => zoom.value * 10);
        const height = computed(() => zoom.value * 10);
        const origin = reactive({
            x: 5,
            y: 5,
        });
        const viewBox = computed(() => `${-origin.x} ${-origin.y} ${width.value} ${height.value}`);

        return {
            elems,
            resolveChipComponent,
            viewBox,
        };
    },
});
</script>

<template>
    <div class="w-screen h-screen p-4 silicon-grid">
        <div class="border border-blue-900 h-full">
            <svg
                ref="containerRef"
                :viewBox="viewBox"
                :class="{
                    'w-full h-full': true,
                }"
            >
                <template v-for="{ pos, elem } in elems" :key="`${pos.x} ${pos.y}`">
                    <svg :x="pos.x" :y="-pos.y" width="1" height="1">
                        <component :is="resolveChipComponent(elem)" :chip="elem" />
                    </svg>
                </template>
            </svg>
        </div>
    </div>
</template>

<style lang="sass">
.silicon-grid
    background: #000020
</style>
