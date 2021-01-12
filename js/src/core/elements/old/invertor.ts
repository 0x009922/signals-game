import { CompositorElement, Direction, SignalsContext } from '@/core/heap';
import { computed, ComputedRef, ref, watch } from 'vue';

export interface ElemInvertor extends CompositorElement {
    output_dir: ComputedRef<Direction>;
    output_active: ComputedRef<boolean>;
    set_output_dir: (val: Direction) => void;
}

export function useElemInvertor(): ElemInvertor {
    const output_dir = ref<Direction>(Direction.Right);
    const output_active = ref(false);

    const set_output_dir = (val: Direction) => {
        output_dir.value = val;
    };

    const use_context = (ctx: SignalsContext) => {
        // Есть активный вход?
        const input = computed<boolean>(() => {
            // инпут активен, если какой-либо входящий сигнал сонаправлен с output_dir
            return ctx.received_signals.value.some((x) => x.dir === output_dir.value);
        });

        // Установка активности выхода по входу
        watch(
            input,
            (val) => {
                // ! Вот здесь происходит инвертирование сигнала
                output_active.value = !val;
            },
            { immediate: true },
        );

        // обновление исходящих сигналов
        watch(
            output_active,
            (val) => {
                ctx.emitted_signals.value = val ? [{ dir: output_dir.value, step: 1 }] : [];
            },
            { immediate: true },
        );
    };

    return {
        output_dir: computed(() => output_dir.value),
        output_active: computed(() => output_active.value),
        set_output_dir,
        use_context,
        unmounted: () => {},
    };
}
