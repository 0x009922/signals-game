<script lang="ts">
import { computed, defineComponent, PropType, watchEffect } from 'vue';
import { BufferChip, PortState, PortType } from '@/chips/buffer';
import { Direction, Vector2Like } from '@/core/heap';
import { DIRECTIONS } from '@/core/dir';
import { Vector2 } from '@/core/vec';
// import { add } from '@/core/vec';

export default defineComponent({
    name: 'ChipBuffer',
    props: {
        chip: {
            type: Object as PropType<BufferChip>,
            required: true,
        },
    },
    setup(props) {
        const { ports, setPortType } = props.chip;

        interface PortItem {
            state: PortState;
            pos: Vector2;
        }

        const STEP = 25;
        const DIR_POSES: Record<Direction, Vector2Like> = {
            [Direction.Up]: { x: 0, y: -STEP },
            [Direction.Down]: { x: 0, y: STEP },
            [Direction.Left]: { x: -STEP, y: 0 },
            [Direction.Right]: { x: STEP, y: 0 },
        };

        const list = computed<PortItem[]>(() => {
            const center = new Vector2(50, 50);
            return DIRECTIONS.map((x) => ({ pos: Vector2.copy(center).add(DIR_POSES[x]), state: ports[x] }));
        });

        return {
            list,
            PortType,
        };
    },
});
</script>

<template>
    <svg width="100%" height="100%" viewBox="0 0 100 100">
        <g stroke-width="2" stroke="green">
            <polyline points="50,25 50,75" />
            <polyline points="25,50 75,50" />
        </g>

        <template v-for="({ pos, state }, i) in list" :key="i">
            <template v-if="state.type === PortType.In">
                <rect
                    width="15"
                    height="15"
                    :fill="state.active ? 'lime' : 'green'"
                    :x="pos.x - 7.5"
                    :y="pos.y - 7.5"
                />
            </template>
            <template v-else>
                <circle :cx="pos.x" :cy="pos.y" r="7.5" :fill="state.active ? 'lime' : 'green'" />
            </template>
        </template>
    </svg>
</template>
