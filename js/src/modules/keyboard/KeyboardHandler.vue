<script lang="ts">
import { defineComponent, provide, reactive, readonly, watchEffect } from 'vue';
import { hookedWindowAddEventListener } from '@/tools/hooked-window-events';
import { KEYS_INJECT_SYMBOL } from './shared';

export default defineComponent({
    name: 'KeyboardHandler',
    setup() {
        const downKeys = reactive(new Set<string>());

        provide(KEYS_INJECT_SYMBOL, readonly({ downKeys }));

        function keydown(ev: KeyboardEvent) {
            downKeys.add(ev.code);
            // console.log('down', ev.code);
        }

        function keyup(ev: KeyboardEvent) {
            downKeys.delete(ev.code);
            // console.log('up', ev.code);
        }

        watchEffect(() => {
            console.log(...downKeys);
        });

        hookedWindowAddEventListener('keydown', keydown);
        hookedWindowAddEventListener('keyup', keyup);
    },
});
</script>

<template>
    <slot />
</template>
