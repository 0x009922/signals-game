<script lang="ts">
// import { useElementBounding, useElementSize } from '@vueuse/core';
import { computed, defineComponent, reactive, ref, watchEffect } from 'vue';
import { useElementSizeByWindow } from '@/tools/element-size';

export default defineComponent({
    name: 'SiliconGridSvg',
    props: {
        /**
         * Величина описывает то, сколько пикселей занимает
         * на поле единичная длина (width/height = 1) при единичном зуме
         */
        baseSize: {
            type: [Number, String],
            default: 100,
        },
    },
    setup(props) {
        // нормализация baseSize
        const baseSize = computed<number>(() => Number(props.baseSize));

        const elem = ref<SVGElement | null>(null);
        const { width: w, height: h } = useElementSizeByWindow(elem);
        watchEffect(() => {
            console.log('size', w.value, h.value);
        });

        const zoom = ref(1);
        const width = computed(() => zoom.value * 10);
        const height = computed(() => zoom.value * 10);
        const origin = reactive({
            x: 5,
            y: 5,
        });
        const viewBox = computed(() => `${-origin.x} ${-origin.y} ${width.value} ${height.value}`);

        // events

        const grabbing = ref(false);

        function mdown(e: MouseEvent) {
            if (e.target === e.currentTarget) {
                grabbing.value = true;
            }
        }

        function mmove(e: MouseEvent) {
            if (grabbing.value) {
                console.log('move', e.movementX, e.movementY);
            }
        }

        function mup() {
            releaseGrabbing();
        }

        function mleave() {
            releaseGrabbing();
        }

        function releaseGrabbing() {
            grabbing.value = false;
        }

        return {
            elem,
            viewBox,

            mdown,
            mmove,
            mup,
            mleave,
        };
    },
});
</script>

<template>
    <svg
        ref="elem"
        :viewBox="viewBox"
        class="w-full h-full"
        @mousedown="mdown"
        @mousemove="mmove"
        @mouseup="mup"
        @mouseleave="mleave"
    >
        <slot />
    </svg>
</template>
