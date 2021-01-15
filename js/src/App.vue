<script lang="ts">
import { defineComponent } from 'vue';
import AppStoreProvider from '@/components/AppStoreProvider.vue';
import DebugMounter from '@/components/DebugMounter.vue';
import SiliconGrid from '@/components/SiliconGrid.vue';
// import SvgSandbo

export default defineComponent({
    components: {
        AppStoreProvider,
        DebugMounter,
        SiliconGrid,
    },
});
</script>

<template>
    // <svg-sandbox />
    <app-store-provider>
        <silicon-grid />
        <debug-mounter />
    </app-store-provider>
</template>
