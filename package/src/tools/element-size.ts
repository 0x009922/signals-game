import { Vector2 } from '@/core/vec';
import { onUnmounted, reactive, watch } from 'vue';
import { MaybeRef, refForSure } from './maybe-ref';

export function useElementSizeByWindow(
    el: MaybeRef<Element | null>,
): {
    size: Vector2;
} {
    const elNormalized = refForSure(el);

    const size = reactive(new Vector2(0, 0));

    function update() {
        if (elNormalized.value) {
            const box = elNormalized.value.getBoundingClientRect();
            size.setFromCoords(box.width, box.height);
        }
    }

    window.addEventListener('resize', update);
    onUnmounted(() => window.removeEventListener('resize', update));

    watch(elNormalized, update);

    return { size };
}
