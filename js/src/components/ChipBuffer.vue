<script lang="ts">
import { computed, defineComponent, PropType, watchEffect } from 'vue';
import { BufferChip, PortState, PortType } from '@/chips/buffer';
import { Direction, Vector2Like } from '@/core/heap';
import { DIRECTIONS } from '@/core/dir';
import { Vector2 } from '@/core/vec';
import { directionVector } from '@/core/vec_dir';
// import { add } from '@/core/vec';

/**
 * Получает угол смещения и радиус, отдаёт вектора равностороннего треугольника.
 *
 * Гарантируется, что одна точка соответствует положению угла.
 */
function triangleVecs(rad: number, angle: number): Vector2[] {
    const vecs: Vector2[] = [];
    for (let i = 0, a = angle; i < 3; i++, a += (Math.PI * 2) / 3) {
        vecs.push(Vector2.fromPolarCoords(rad, a));
    }
    return vecs;
}

function portTrianglePoints({ dir, type, center }: { dir: Direction; type: PortType; center: Vector2 }): string {
    // const { type } = props.chip.ports[dir];
    const RAD = 10;
    let angle = ([Direction.Right, Direction.Down, Direction.Left, Direction.Up].indexOf(dir) * Math.PI) / 2;
    if (type === PortType.In) {
        angle += Math.PI;
    }

    return triangleVecs(RAD, angle)
        .map((vec) => vec.add(center).add(directionVector(dir, 25).negateY()))
        .map((vec) => `${vec.x},${vec.y}`)
        .join(' ');
}

export default defineComponent({
    name: 'ChipBuffer',
    props: {
        chip: {
            type: Object as PropType<BufferChip>,
            required: true,
        },
    },
    setup(props) {
        interface PortItem {
            state: PortState;
            // pos: Vector2;
            dir: Direction;
        }

        const CENTER = new Vector2(50, 50);

        const somePortActive = computed<boolean>(() => DIRECTIONS.some((dir) => props.chip.ports[dir].active));

        // const STEP = 25;
        // const DIR_POSES: Record<Direction, Vector2Like> = {
        //     [Direction.Up]: { x: 0, y: -STEP },
        //     [Direction.Down]: { x: 0, y: STEP },
        //     [Direction.Left]: { x: -STEP, y: 0 },
        //     [Direction.Right]: { x: STEP, y: 0 },
        // };

        const list = computed<PortItem[]>(() => {
            return DIRECTIONS.map((dir) => ({
                // pos: Vector2.copy(CENTER).add(DIR_POSES[dir]),
                state: props.chip.ports[dir],
                dir,
            }));
        });

        function computePortTriangle(dir: Direction) {
            const { type } = props.chip.ports[dir];
            return portTrianglePoints({
                type,
                dir,
                center: CENTER,
            });
        }

        function linePoints(dir: Direction) {
            const dirvec = directionVector(dir, 1).negateY();

            return [CENTER.copy().add(dirvec.copy().mulScalar(2)), CENTER.copy().add(dirvec.copy().mulScalar(25))]
                .map((vec) => `${vec.x},${vec.y}`)
                .join(' ');
        }

        function stateColor(val: boolean): string {
            return val ? '#22FF22' : '#004400';
        }

        const BORDER = 'black';

        return {
            list,
            PortType,
            computePortTriangle,
            linePoints,
            stateColor,
            somePortActive,
            BORDER,
        };
    },
});
</script>

<template>
    <svg width="100%" height="100%" viewBox="0 0 100 100" class="chip-buffer">
        <!-- <g stroke-width="2" stroke="green">
            <polyline points="50,25 50,75" />
            <polyline points="25,50 75,50" />
        </g> -->

        <template v-for="({ state, dir }, i) in list" :key="i">
            <polyline
                stroke-width="4"
                :class="{ 'z-10': state.active }"
                stroke-linecap="round"
                :stroke="stateColor(state.active)"
                :points="linePoints(dir)"
            />
            <polygon
                :points="computePortTriangle(dir)"
                stroke-width="1.5"
                stroke-linejoin="bevel"
                :stroke="BORDER"
                :fill="stateColor(state.active)"
            />

            <!-- <template v-if="state.type === PortType.In">
                <polygon
                    :points="computePortTriangle(dir)"
                    stroke-width="2"
                    stroke="green"
                    :fill="state.active ? 'lime' : 'green'"
                />
            </template>
            <template v-else>
                <circle :cx="pos.x" :cy="pos.y" r="7.5" :fill="state.active ? 'lime' : 'green'" />
            </template> -->
        </template>

        <circle cx="50" cy="50" r="5" :stroke="BORDER" stroke-width="1.5" :fill="stateColor(somePortActive)" />
    </svg>
</template>

<style lang="sass" scoped>
.chip-buffer
    *
        transition: all .1s ease
</style>
