<script lang="ts">
import { defineComponent } from 'vue';
import { useSilicon } from '@/core/silicon';
import { useLightningEnvironment } from '@/core/lightning-env';
import { setupSource } from '@/core/elements/source';
import { setupLuminodiode } from '@/core/elements/luminodiode';

export default defineComponent({
    setup() {
        const silicon = useSilicon({ env: useLightningEnvironment() });
        const { active: sourceActive, on, off } = silicon.mount({ x: 0, y: 0 }, setupSource);
        const { active: light } = silicon.mount({ x: 0, y: 1 }, setupLuminodiode);

        return {
            sourceActive,
            toggleSource: () => (sourceActive.value ? off() : on()),
            light,
        };
    },
});
</script>

<template>
    <h1>source</h1>
    <pre>active: {{ sourceActive }}</pre>
    <button @click="toggleSource">toggle</button>

    <h1>Lum</h1>
    <span v-if="light">Light!</span>
</template>
