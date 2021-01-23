<script lang="ts">
import { defineComponent, onUnmounted, reactive, watchEffect } from 'vue';
import { hookedWindowAddEventListener } from '@/tools/hooked-window-events';

export default defineComponent({
    name: 'KeyboardHandler',
    setup() {
        const downKeys = reactive(new Set<string>());

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

        return () => null;
    },
});
</script>
