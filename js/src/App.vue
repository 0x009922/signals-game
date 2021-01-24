<script lang="ts">
import { defineComponent } from 'vue';
import AppStoreProvider from '@/components/AppStoreProvider.vue';
import DebugMounter from '@/components/DebugMounter.vue';
import SiliconGrid from '@/components/SiliconGrid.vue';
// import KeyboardHandlerVue from '@/modules/keyboard/KeyboardHandler.vue';
import KeysPanel from './modules/keyboard/KeysPanel.vue';
import PrimaryKeysHandler from './components/PrimaryKeysHandler.vue';
// import SvgSandbox from '@/components/SvgSandbox.vue';

export default defineComponent({
    components: {
        AppStoreProvider,
        DebugMounter,
        SiliconGrid,
        // KeyboardHandlerVue,
        KeysPanel,
        PrimaryKeysHandler,
    },
});
</script>

<template>
    <!-- <svg-sandbox /> -->
    <app-store-provider>
        <silicon-grid />
        <debug-mounter />

        <keys-panel />
        <primary-keys-handler />
        <!-- <keyboard-handler-vue> -->
        <!-- </keyboard-handler-vue> -->
    </app-store-provider>
</template>
