import { onUnmounted, reactive, Ref, toRefs, watch } from 'vue';
import { MaybeRef, refForSure } from './maybe-ref';

export function useElementSizeByWindow(
    el: MaybeRef<Element | null>,
): {
    width: Ref<number>;
    height: Ref<number>;
} {
    const elNormalized = refForSure(el);

    const size = reactive({
        width: 0,
        height: 0,
    });

    function update() {
        if (elNormalized.value) {
            const box = elNormalized.value.getBoundingClientRect();
            size.width = box.width;
            size.height = box.height;
        }
    }

    window.addEventListener('resize', update);
    onUnmounted(() => window.removeEventListener('resize', update));

    watch(elNormalized, update);

    return toRefs(size);
}
