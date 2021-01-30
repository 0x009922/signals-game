<script lang="ts">
import { BufferChip, PortType } from '@/chips/buffer';
import { Direction } from '@/core/heap';
import { hookedWindowAddEventListener } from '@/tools/hooked-window-events';
import { defineComponent, PropType, reactive, ref } from 'vue';
import Key from '../Key.vue';
import { KEYS } from './wasd';

export default defineComponent({
    components: { Key },
    props: {
        chip: {
            type: Object as PropType<BufferChip>,
            required: true,
        },
    },
    setup(props) {
        function togglePort(dir: Direction) {
            const RING: PortType[] = [PortType.In, PortType.Out, PortType.Off];
            const current = props.chip.ports[dir].type;
            const next = RING[(RING.indexOf(current) + 1) % RING.length];
            props.chip.setPortType(dir, next);
        }

        const keys = reactive(
            KEYS.map((dirkey) => {
                const down = ref(false);

                hookedWindowAddEventListener('keydown', (ev) => {
                    if (ev.code === dirkey.code && !ev.repeat) {
                        down.value = true;
                        togglePort(dirkey.dir);
                    }
                });

                hookedWindowAddEventListener('keyup', (ev) => {
                    if (ev.code === dirkey.code) {
                        down.value = false;
                    }
                });

                return { ...dirkey, down };
            }),
        );

        return {
            keys,
        };
    },
});
</script>

<template>
    <div class="flex space-x-4">
        <key v-for="item in keys" :key="item.code" :label="item.label" :down="item.down" />
    </div>
</template>
