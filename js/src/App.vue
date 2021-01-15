<script lang="ts">
import { defineComponent } from 'vue';
import AppStoreProvider from '@/components/AppStoreProvider.vue';
import DebugMounter from '@/components/DebugMounter.vue';

export default defineComponent({
    components: {
        AppStoreProvider,
        DebugMounter,
    },
});
</script>

<template>
    <app-store-provider>
        <debug-mounter />
    </app-store-provider>
</template>
