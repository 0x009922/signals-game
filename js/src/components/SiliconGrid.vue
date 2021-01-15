<script lang="ts">
import { Component, defineComponent } from 'vue';
import { AppChips, useAppStore } from '@/state';
import ChipPowerSupply from './ChipPowerSupply.vue';
import ChipSensor from './ChipSensor.vue';
import ChipInvertor from './ChipInvertor.vue';
import { Vector2 } from '@/core/heap';

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
                default:
                    throw new Error(`Unknown chip`);
            }
        }

        const CENTER: Vector2 = { x: 4, y: 4 };

        function gridPosition(pos: Vector2) {
            return {
                gridColumn: CENTER.x + pos.x,
                gridRow: CENTER.y - pos.y,
            };
        }

        return {
            elems,
            resolveChipComponent,
            gridPosition,
        };
    },
});
</script>

<template>
    <div class="silicon-grid h-screen p-4">
        <template v-for="{ pos, elem } in elems">
            <div
                class="border"
                :style="{
                    ...gridPosition(pos),
                }"
            >
                <component :is="resolveChipComponent(elem)" :chip="elem" />
            </div>
        </template>
    </div>
</template>

<style lang="sass">
.silicon-grid
    display: grid

    $size: 60px
    grid-template-columns: repeat(auto-fill, $size)
    grid-template-rows: repeat(auto-fill, $size)

    $gap: 5px
    gap: $gap

    // place-items: stretch
</style>
