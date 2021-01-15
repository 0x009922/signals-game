<script lang="ts">
import { defineComponent } from 'vue';
import { createAppStore, provideAppStore } from '@/state';

export default defineComponent({
    name: 'AppStoreProvider',
    setup() {
        provideAppStore(createAppStore());
    },
});
</script>

<template>
    <slot />
</template>
