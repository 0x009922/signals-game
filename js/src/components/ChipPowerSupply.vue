<script lang="ts">
import { PowerSupplyChip } from '@/chips/power-supply';
import { DIRECTIONS } from '@/core/dir';
import { Vector2 } from '@/core/vec';
import { computed, ComputedRef, defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'ChipPowerSupply',
    props: {
        chip: {
            type: Object as PropType<PowerSupplyChip>,
            required: true,
        },
    },
    setup(props) {
        // const { enabled, toggle } = props.chip;

        function toggle() {
            props.chip.toggle();
        }

        const enabled = computed(() => props.chip.enabled.value);

        // useCustomKeys({
        //     KeyE: {
        //         label: 'E',
        //         description: 'on/off',
        //         down: () => toggle(),
        //     },
        // });

        const outputs: { points: string }[] = Array.from(new Array(4), (v, i) => {
            const angle = (i * Math.PI) / 2;
            const points: string = [Vector2.fromPolarCoords(30, angle), Vector2.fromPolarCoords(40, angle)]
                .map((v) => v.add({ x: 50, y: 50 }))
                .map((vec) => vec.toSvgCoords())
                .join(' ');
            return { points };
        });

        const outputsInner: { path: ComputedRef<string> }[] = Array.from(new Array(4), (v, i) => {
            const angle = (i * Math.PI) / 2;
            const path = computed<string>(() => {
                const len = enabled.value ? 30 : 20;
                const lineto = Vector2.fromPolarCoords(len, angle).add({ x: 50, y: 50 });
                return `M50 50 L${lineto.x} ${lineto.y}`;

                // return [Vector2.fromPolarCoords(0, angle), Vector2.fromPolarCoords(len, angle)]
                //     .map((v) => v.add({ x: 50, y: 50 }))
                //     .map((vec) => vec.toSvgCoords())
                //     .join(' ');
            });
            return { path };
        });

        return {
            enabled,
            toggle,
            outputs,
            outputsInner,
        };
    },
});
</script>

<template>
    <svg width="100%" height="100%" viewBox="0 0 100 100">
        <template v-for="({ path }, i) in outputsInner" :key="`${i}-inner`">
            <path :d="path.value" stroke="lime" class="moving-output" stroke-width="2" stroke-linecap="round" />
        </template>

        <template v-for="{ points } in outputs">
            <polyline
                :points="points"
                :class="{
                    'static-output': true,
                    'static-output--active': enabled,
                }"
                stroke="#004400"
                stroke-width="5"
                stroke-linecap="round"
            />
        </template>

        <circle cx="50%" cy="50%" r="10%" fill="lime" />

        <!-- <text fill="white" x="10" y="20">Power</text>
        <text :fill="enabled ? 'blue' : '#000088'" font-size="2em" x="20" y="50" dy="15">
            {{ enabled ? 'ON' : 'OFF' }}
        </text> -->

        <!-- <rect
            width="100%"
            height="100%"
            stroke="#000050"
            stroke-width="15"
            fill="transparent"
            class="cursor-pointer"
            @click="toggle"
        ></rect> -->
    </svg>
</template>

<style lang="sass" scoped>
$t: all .4s cubic-bezier(0.25, 1, 0.5, 1)

.moving-output,
.static-output
    transition: $t

.static-output
    stroke: #004400

    &--active
        // transition-delay: .1s
        stroke: lime
</style>
