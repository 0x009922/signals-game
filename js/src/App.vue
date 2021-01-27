<script lang="ts">
import { defineComponent } from 'vue';
import AppStoreProvider from '@/components/AppStoreProvider.vue';
import DebugMounter from '@/components/DebugMounter.vue';
import SiliconGrid from '@/components/SiliconGrid.vue';
// import KeyboardHandlerVue from '@/modules/keyboard/KeyboardHandler.vue';
import KeysPanel from './modules/keyboard/KeysPanel.vue';
import PrimaryKeysHandler from './components/PrimaryKeysHandler.vue';
import SpecificLayoutSelector from './modules/keyboard/chip-specific-layouts/Selector.vue';
// import SvgSandbox from '@/components/SvgSandbox.vue';

export default defineComponent({
    components: {
        AppStoreProvider,
        DebugMounter,
        SiliconGrid,
        // KeyboardHandlerVue,
        KeysPanel,
        PrimaryKeysHandler,
        SpecificLayoutSelector,
    },
});
</script>

<template>
    <app-store-provider>
        <silicon-grid />
        <debug-mounter />

        <keys-panel />
        <primary-keys-handler />
        <specific-layout-selector />
    </app-store-provider>
</template>
