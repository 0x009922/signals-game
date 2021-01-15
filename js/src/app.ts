// import { createApp } from 'vue';

import { computed, ref, watch, watchEffect } from 'vue';
import { Direction } from './core/heap';
import { useSilicon } from './core/silicon';

function logTime(...args) {
    const time = ~~performance.now() / 1000;
    console.log(`[${String(time).padStart(8, ' ')}]`, ...args);
}

const { mount } = useSilicon({
    env: {
        dispatch: (cb) => {
            logTime('env fired');
            cb();
        },
    },
});
const { emit } = mount({ x: 5, y: 5 }, ({ emitted }) => {
    const val = ref(false);
    function emit() {
        val.value = true;
    }
    emitted(() => (val.value ? [{ dir: Direction.Right, step: 1 }] : []));
    return { emit };
});
mount({ x: 6, y: 5 }, () => {});

emit();
