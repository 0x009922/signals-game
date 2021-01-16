<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { setupPowerSupply } from '@/chips/power-supply';
import { setupSensor } from '@/chips/sensor';
import { useAppStore } from '@/state';
import { setupInvertor } from '@/chips/invertor';
import { PortType, setupBufferChip } from '@/chips/buffer';
import { Direction } from '@/core/heap';

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

            silicon.mount({ x: 1, y: 0 }, setupInvertor);
            silicon.mount({ x: 2, y: 0 }, setupSensor);
            silicon.mount({ x: -1, y: 0 }, setupSensor);
            silicon.mount({ x: 0, y: -1 }, setupSensor);
            silicon.mount({ x: 3, y: -3 }, setupSensor);

            {
                const buff = silicon.mount({ x: 0, y: 1 }, setupBufferChip);
                buff.setPortType(Direction.Up, PortType.Out);
            }
            {
                const buff = silicon.mount({ x: 0, y: 2 }, setupBufferChip);
                buff.setPortType(Direction.Right, PortType.Out);
            }
            {
                const buff = silicon.mount({ x: 1, y: 2 }, setupBufferChip);
                buff.setPortType(Direction.Up, PortType.Out);
                buff.setPortType(Direction.Right, PortType.Out);
            }
            {
                const buff = silicon.mount({ x: 1, y: 3 }, setupBufferChip);
                buff.setPortType(Direction.Left, PortType.Out);
            }
            silicon.mount({ x: 0, y: 3 }, setupSensor);
        }

        onMounted(() => {
            if (!someMounted.value) {
                mount();
            }
        });

        return {
            clearAll,
            mount,
            someMounted,
        };
    },
});
</script>

<template>
    <div class="fixed select-none top-0 right-0 p-2 m-2 shadow-xl border bg-white w-64 space-y-2">
        <h1 class="text-red-700">Debug</h1>

        <it-button :disabled="!someMounted" @click="clearAll">clear mounted</it-button>
        <it-button :disabled="someMounted" @click="mount">mount</it-button>
    </div>
</template>
