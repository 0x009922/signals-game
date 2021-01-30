<script lang="ts">
import { InvertorChip } from '@/chips/invertor';
import { Direction } from '@/core/heap';
import { Vector2 } from '@/core/vec';
import { triangleVecs } from '@/tools/triangle';
import { computed, defineComponent, PropType, watchEffect } from 'vue';

export default defineComponent({
    name: 'ChipPowerSupply',
    props: {
        chip: {
            type: Object as PropType<InvertorChip>,
            required: true,
        },
    },
    setup(props) {
        const COLOR_ON = 'lime';
        const COLOR_OFF = '#004400';

        const outputActive = computed(() => props.chip.outputActive.value);

        const inputColor = computed(() => (outputActive.value ? '#550' : '#ff0'));
        const outputColor = computed(() => (outputActive.value ? COLOR_ON : COLOR_OFF));

        const order = [Direction.Right, Direction.Down, Direction.Left, Direction.Up];
        const rotate = computed(() => {
            const index = order.indexOf(props.chip.outputDir.value);
            return `rotate(${index * 90} 50 50)`;
        });

        const center = new Vector2(50, 50);
        const triangleIn = triangleVecs(10, 0)
            .map((vec) => vec.add(center).add({ x: -25, y: 0 }).toSvgCoords())
            .join(' ');
        const triangleOut = triangleVecs(10, 0)
            .map((vec) => vec.add(center).add({ x: 25, y: 0 }).toSvgCoords())
            .join(' ');

        return {
            outputColor,
            inputColor,
            rotate,
            triangleIn,
            triangleOut,
            outputActive,
        };
    },
});
</script>

<template>
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        :class="{ invertor: true, 'invertor--active': !outputActive }"
    >
        <g :transform="rotate">
            <polyline class="line-in" points="50,50 25,50" />
            <polygon class="tri-in" :points="triangleIn" />

            <polyline class="line-out" points="50,50 75,50" />
            <polygon class="tri-out" :points="triangleOut" />
            <circle class="core" cx="50%" cy="50%" r="7" />
        </g>
    </svg>
</template>

<style lang="sass" scoped>
$block-on: #ff0
$block-off: #550

$out-on: lime
$out-off: #040

@mixin color-state($value)
    .line-in
        stroke: if($value, $block-on, $block-off)
    .tri-in
        fill: if($value, $block-on, $block-off)
    .line-out
        stroke: if($value, $out-off, $out-on)
    .tri-out
        fill: if($value, $out-off, $out-on)
    .core
        fill: if($value, $block-on, $out-on)

.invertor
    .line-in, .line-out
        stroke-width: 4

    g >  *
        transition: all .15s ease
        stroke-linejoin: bevel

    &:not(&--active)
        +color-state(false)

    &--active
        +color-state(true)
</style>
