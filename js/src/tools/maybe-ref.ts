import { computed, ComputedRef, isRef, Ref } from 'vue';

export type MaybeRef<T> = T | Ref<T>;

export function refForSure<T>(mb: MaybeRef<T>): ComputedRef<T> {
    return computed(() => (isRef(mb) ? mb.value : mb));
}
