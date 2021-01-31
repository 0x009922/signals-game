<script lang="ts">
import { AppChips, useAppStore } from '@/state';
import { Component, computed, defineComponent } from 'vue';
import BufferVue from './Buffer.vue';
import InvertorVue from './Invertor.vue';
import PowerVue from './Power.vue';

type SupportedChips = AppChips['chip'] & 'INVERTOR' & 'BUFFER' & 'POWER_SUPPLY';

const CHIP_LAYOUT: {
    [K in SupportedChips]: Component;
} = {
    INVERTOR: InvertorVue,
    POWER_SUPPLY: PowerVue,
    BUFFER: BufferVue,
};

export default defineComponent({
    setup() {
        const {
            silicon,
            mouse: { currentGridCell },
        } = useAppStore();

        const currentChip = computed<AppChips | null>(() => {
            return silicon.elems.value.find((x) => currentGridCell.equals(x.pos))?.elem ?? null;
        });

        const currentChipName = computed(() => currentChip.value?.chip ?? null);

        const currentChipComponent = computed(() => {
            return currentChipName.value && CHIP_LAYOUT[currentChipName.value as SupportedChips];
        });

        return {
            currentChip,
            currentChipComponent,
        };
    },
});
</script>

<template>
    <div class="fixed bottom-0 right-0 p-4">
        <component :is="currentChipComponent" :chip="currentChip" />
    </div>
</template>
