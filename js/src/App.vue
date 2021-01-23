<script lang="ts">
import { defineComponent } from 'vue';
import AppStoreProvider from '@/components/AppStoreProvider.vue';
import DebugMounter from '@/components/DebugMounter.vue';
import SiliconGrid from '@/components/SiliconGrid.vue';
import KeyboardHandlerVue from './components/KeyboardHandler.vue';
// import SvgSandbox from '@/components/SvgSandbox.vue';

export default defineComponent({
    components: {
        AppStoreProvider,
        DebugMounter,
        SiliconGrid,
        KeyboardHandlerVue,
    },
});
</script>

<template>
    <!-- <svg-sandbox /> -->
    <app-store-provider>
        <silicon-grid />
        <debug-mounter />

        <keyboard-handler-vue />
    </app-store-provider>
</template>
