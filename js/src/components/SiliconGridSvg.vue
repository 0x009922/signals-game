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
        const { width: absWidth, height: absHeight } = useElementSizeByWindow(elem);

        const zoom = ref(0.5);
        // const zoomedBaseSize = computed<number>(() => zoom.value * baseSize.value);
        const origin = reactive({
            x: 0,
            y: 0,
        });

        const viewBox = computed<string>(() => {
            const sizeK = 1 / (zoom.value * baseSize.value);
            const w = absWidth.value * sizeK;
            const h = absHeight.value * sizeK;

            return [-w / 2 - origin.x * zoom.value, -h / 2 - origin.y * zoom.value, w, h].join(' ');
        });

        // events

        const grabbing = ref(false);

        function mdown(e: MouseEvent) {
            if (e.target === e.currentTarget) {
                grabbing.value = true;
            }
        }

        function mmove(e: MouseEvent) {
            if (grabbing.value) {
                // я не знаю, почему зум в квадрате ._.
                const k = 1 / (baseSize.value * zoom.value ** 2);
                origin.x += e.movementX * k;
                origin.y += e.movementY * k;
            }
        }

        function mup() {
            releaseGrabbing();
        }

        function mleave() {
            releaseGrabbing();
        }

        function mwheel({ wheelDelta: delta }: { wheelDelta: number }) {
            const val = delta * (0.1 / 120);
            zoom.value += val;
            // TODO сохранять курсор на том же месте
        }

        function releaseGrabbing() {
            grabbing.value = false;
        }

        return {
            elem,
            viewBox,
            zoom,
            origin,
            grabbing,

            mdown,
            mmove,
            mup,
            mleave,
            mwheel,
        };
    },
});
</script>

<template>
    <!-- <div class="fixed bottom-0 left-0 m-2 bg-white p-4 rounded space-y-2">
        <it-input v-model.number="zoom" label-top="zoom" />
        <it-input v-model.number="origin.x" label-top="origin.x" />
        <it-input v-model.number="origin.y" label-top="origin.y" />
    </div> -->

    <svg
        ref="elem"
        :viewBox="viewBox"
        :class="{
            'w-full h-full root': true,
            'root--grabbing': grabbing,
        }"
        @mousedown="mdown"
        @mousemove="mmove"
        @mouseup="mup"
        @mouseleave="mleave"
        @mousewheel="mwheel"
    >
        <!-- <circle cx="0" cy="0" r="1" fill="blue" /> -->

        <slot />
    </svg>
</template>

<style lang="sass" scoped>
svg.root
    cursor: grab
    user-select: none

    &--grabbing
        cursor: grabbing
</style>
