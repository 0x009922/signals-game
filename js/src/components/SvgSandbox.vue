<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onUnmounted, reactive, ref, watchEffect } from 'vue';
import { useElementBounding } from '@vueuse/core';

function useWindowResize(cb: () => void) {
    window.addEventListener('resize', cb);
    onBeforeUnmount(() => {
        window.removeEventListener('resize', cb);
    });
}

export default defineComponent({
    name: 'SvgSandbox',
    setup() {
        // const hover = ref(false);

        // const grabbing = ref(false);

        // const containerSize = reactive({
        //     w: 0,
        //     h: 0,
        // });
        // const containerRef = ref<SVGElement | null>(null);
        // useWindowResize(() => {
        //     if (containerRef.value) {
        //         const box = containerRef.value.getBoundingClientRect();
        //         containerSize.w = box.width;
        //         containerSize.h = box.height;
        //         // console.log('Container:', box.width, box.height);
        //     }
        // });
        // const { width: containerWidth, height: containerHeight } = useElementBounding(containerRef);
        // watchEffect(() => {
        //     console.log('Container:', containerWidth.value, containerHeight.value);
        // });

        // нужно поставить ось координат в центр
        // а элементы рисовать в перевёрнутом по OY виде

        const zoom = ref(1);
        const width = computed(() => zoom.value * 10);
        const height = computed(() => zoom.value * 10);
        const origin = reactive({
            x: 5,
            y: 5,
        });
        const viewBox = computed(() => `${-origin.x} ${-origin.y} ${width.value} ${height.value}`);

        // function mdown(e: MouseEvent) {
        //     console.log(e.currentTarget === e.target);
        //     grabbing.value = true;
        // }

        // function mmove(e: MouseEvent) {
        //     if (grabbing.value) {
        //         origin.x -= e.movementX / zoom.value;
        //         origin.y -= e.movementY / zoom.value;
        //         // console.log('move', e.movementX, e.movementY);
        //     }
        // }

        // function mup() {
        //     grabbing.value = false;
        //     console.log('up');
        // }

        // function mleave() {
        //     grabbing.value = false;
        //     console.log('leave');
        // }

        return {
            // hover,
            // grabbing,
            // containerRef,
            viewBox,
            // mdown,
            // mmove,
            // mup,
            // mleave,
        };
    },
});
</script>

<template>
    <div class="w-screen h-screen p-4">
        <div class="border h-full shadow-lg">
            <svg
                ref="containerRef"
                :viewBox="viewBox"
                :class="{
                    'w-full h-full': true,
                }"
            >
                <!-- <g transform="translate(2 4)">
                    <rect
                        width="1"
                        height="1"
                        fill="lime"
                        class="cursor-pointer"
                        @mouseenter="hover = true"
                        @mouseleave="hover = false"
                    ></rect>
                </g>

                <text x="1" y="1" font-size="0.05em" class="select-none">Hover: {{ hover }}</text> -->

                <svg x="0" y="-1" width="1" height="1">
                    <rect fill="blue" width="100%" height="100%" />
                </svg>

                <svg x="1" y="-1" width="1" height="1">
                    <rect fill="red" width="100%" height="100%" />
                </svg>
            </svg>
        </div>
    </div>
</template>
