<script lang="ts">
import { setupPowerSupply } from '@/chips/power-supply';
import { setupSensor } from '@/chips/sensor';
import { useAppStore } from '@/state';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'DebugMounter',
    setup() {
        const { silicon } = useAppStore();

        const someMounted = computed<boolean>(() => silicon.elems.value.length > 0);

        function clearAll() {
            silicon.elems.value.forEach(({ pos }) => silicon.unmount(pos));
        }

        function mount() {
            silicon.mount({ x: 0, y: 0 }, setupPowerSupply);
            silicon.mount({ x: 1, y: 0 }, setupSensor);
        }

        return {
            clearAll,
            mount,
            someMounted,
        };
    },
});
</script>

<template>
    <div class="fixed top-0 left-0 p-2 m-2 shadow-md">
        <h1 class="mb-2 text-red-700">Debug</h1>

        <it-button v-if="someMounted" @click="clearAll">clear mounted</it-button>
        <it-button v-else @click="mount">mount</it-button>
    </div>
</template>
