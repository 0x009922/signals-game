<script lang="ts">
import { PowerSupplyChip } from '@/chips/power-supply';
import { hookedWindowAddEventListener } from '@/tools/hooked-window-events';
import { defineComponent, PropType, ref } from 'vue';
import Key from '../Key.vue';

export default defineComponent({
    components: {
        Key,
    },
    props: {
        chip: {
            type: Object as PropType<PowerSupplyChip>,
            required: true,
        },
    },
    setup(props) {
        const down = ref(false);

        const CODE = 'KeyE';

        hookedWindowAddEventListener('keydown', (ev) => {
            if (ev.code === CODE && !ev.repeat) {
                down.value = true;
                props.chip.toggle();
            }
        });

        hookedWindowAddEventListener('keyup', (ev) => {
            if (ev.code === CODE) {
                down.value = false;
            }
        });

        return { down };
    },
});
</script>

<template>
    <key label="E" :down="down" />
</template>
