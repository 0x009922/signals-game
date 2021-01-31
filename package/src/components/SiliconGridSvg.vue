<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import { useElementSizeByWindow } from '@/tools/element-size';
import { useSvgNavigation, setupScaleMouseOrigin } from '@/tools/svg-coords';
import { Vector2 } from '@/core/vec';
import { useAppStore } from '@/state';

// function relativeToAbs()

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
        const { size: absSize } = useElementSizeByWindow(elem);

        const zoom = ref(1);
        const scale = computed(() => zoom.value * baseSize.value);
        const absOffset: Vector2 = reactive(Vector2.zero());
        const mousePos: Vector2 = reactive(Vector2.zero());

        const { viewBox, mouseRelPos } = useSvgNavigation({
            absSize,
            absOffset,
            mousePos,
            scale,
        });

        setupScaleMouseOrigin({
            scale,
            absSize,
            absOffset,
            mousePosAbs: mousePos,
        });

        // клеточка, над которой мышь
        const mouseCell = computed(() => {
            const { x, y } = mouseRelPos.value;
            return new Vector2(Math.floor(x), -Math.floor(y));
            // return {
            //     x: Math.floor(x),
            //     y: -Math.floor(y),
            // };
        });
        const mouseCellKey = computed(() => mouseCell.value.toKey());

        const {
            mouse: { setGridCell },
        } = useAppStore();
        watch(mouseCell, setGridCell, { deep: true, immediate: true });

        // events

        const grabbing = ref(false);

        function mdown(e: MouseEvent) {
            if (e.target === e.currentTarget) {
                grabbing.value = true;
            }
        }

        function mmove(e: MouseEvent) {
            const movement = new Vector2(e.offsetX, e.offsetY).sub(mousePos);
            mousePos.setFromCoords(e.offsetX, e.offsetY);
            if (grabbing.value) {
                absOffset.add(movement);
            }
        }

        function mup() {
            releaseGrabbing();
        }

        function mleave() {
            releaseGrabbing();
        }

        function mwheel({ wheelDelta: delta }: { wheelDelta: number }) {
            let val = 1.1;
            if (delta < 0) val = 1 / val;
            zoom.value *= val;
        }

        function releaseGrabbing() {
            grabbing.value = false;
        }

        return {
            elem,
            viewBox,
            zoom,
            // origin,
            grabbing,

            mousePos,
            absSize,
            absOffset,
            mouseRelPos,
            // mousePosRel,
            // absWidth,
            // absHeight,

            mouseCell,
            mouseCellKey,

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

    <!-- <div class="fixed bottom-0 left-0 m-2 bg-black text-red-500 p-2 text-sm rounded space-y-1 w-64">
        <pre>{{
            {
                absSize,
                absOffset,
                mousePos,
                mouseRelPos,
                mouseCell,
            }
        }}</pre>
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

        <transition name="fade">
            <rect
                :key="mouseCellKey"
                class="mouse-cell-rect pointer-events-none"
                fill="#ffffff20"
                :x="mouseCell.x"
                :y="-mouseCell.y"
                width="1"
                height="1"
            />
        </transition>
        <!-- <g stroke="green" stroke-width="0.1" fill="transparent">
            <polyline points="0,5 0,0 5,0" class="pointer-events-none" />
        </g>

        <circle
            :cx="mouseRelPos.x"
            :cy="mouseRelPos.y"
            r="0.1"
            stroke="pink"
            fill="white"
            class="pointer-events-none"
        /> -->
    </svg>
</template>

<style lang="sass">
.fade-transition
    &-leave-active
        transition: opacity 0.2s ease
    &-leave-to
        opacity: 0
</style>

<style lang="sass" scoped>
svg.root
    cursor: grab
    user-select: none
    transition: viewBox .3s ease

    // width: 500px
    // height: 500px
    // border: 1px solid green

    &--grabbing
        cursor: grabbing

    // .mouse-cell-rect
    //     transition: all .15s ease
</style>
