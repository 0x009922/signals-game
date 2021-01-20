import { computed, ComputedRef, Ref, watch } from 'vue';
import { Vector2 } from '@/core/vec';

/**
 * Настройка масштабирования картинки относительно позиции мыши на поле
 *
 * Изменяет передаваемый `absOffset`
 */
export function setupScaleMouseOrigin(params: {
    scale: Ref<number>;
    absSize: Vector2;
    absOffset: Vector2;
    mousePosAbs: Vector2;
}) {
    watch(params.scale, (to, from) => {
        const scalesFactor = to / from;

        params.absOffset.setFromVec(
            Vector2.copy(params.mousePosAbs)
                .sub(Vector2.copy(params.absSize).divideScalar(2))
                .mulScalar(1 - scalesFactor)
                .add(Vector2.copy(params.absOffset).mulScalar(scalesFactor)),
        );
    });
}

export function useSvgNavigation(params: {
    /**
     * Размер канвы, в пикселях
     *
     * @reactive
     */
    absSize: Vector2;
    /**
     * Смещение центра внутренней системы координат
     * относительно центра канвы, абсолютно
     *
     * @reactive
     */
    absOffset: Vector2;
    /**
     * Позиция мыши на конве, абсолютная
     *
     * @reactive
     */
    mousePos: Vector2;
    /**
     * Коэффициент масштабирования изображения.
     */
    scale: Ref<number>;
}): {
    viewBox: ComputedRef<string>;
    mouseRelPos: ComputedRef<Vector2>;
} {
    const viewBox = computed<string>(() => {
        const size = Vector2.copy(params.absSize).divideScalar(params.scale.value);
        const offset = Vector2.copy(params.absOffset).divideScalar(params.scale.value);
        const viewBoxOffset = Vector2.copy(size).negate().divideScalar(2).sub(offset);

        return [viewBoxOffset.x, viewBoxOffset.y, size.x, size.y].join(' ');
    });

    const mouseRelPos = computed(() => {
        return Vector2.copy(params.mousePos)
            .sub(Vector2.copy(params.absSize).divideScalar(2))
            .sub(params.absOffset)
            .divideScalar(params.scale.value);
    });

    return {
        viewBox,
        mouseRelPos,
    };
}
