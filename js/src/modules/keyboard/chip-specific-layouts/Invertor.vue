<script lang="ts">
import { InvertorChip } from '@/chips/invertor';
import { hookedWindowAddEventListener } from '@/tools/hooked-window-events';
import { defineComponent, PropType, reactive, ref } from 'vue';
import Key from '../Key.vue';
import { KEYS } from './wasd';

export default defineComponent({
    name: 'InvertorLayout',
    components: { Key },
    props: {
        chip: {
            type: Object as PropType<InvertorChip>,
            required: true,
        },
    },
    setup(props) {
        const keys = reactive(
            KEYS.map((x) => {
                const down = ref(false);

                hookedWindowAddEventListener('keydown', (ev) => {
                    if (ev.code === x.code && !ev.repeat) {
                        down.value = true;
                        props.chip.setOutputDir(x.dir);
                    }
                });

                hookedWindowAddEventListener('keyup', (ev) => {
                    if (ev.code === x.code) {
                        down.value = false;
                    }
                });

                return { ...x, down };
            }),
        );

        return { keys };
    },
});
</script>

<template>
    <div class="flex space-x-4">
        <key v-for="item in keys" :key="item.code" :label="item.label" :down="item.down" />
    </div>
</template>
