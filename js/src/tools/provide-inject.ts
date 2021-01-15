import { inject, provide } from 'vue';

export function createInjectHelpers<T>(
    description: string,
): {
    provide: (item: T) => void;
    use: () => T;
} {
    const sym = Symbol(description);

    return {
        provide: (item) => provide(sym, item),
        use: () => {
            const item = inject<T>(sym);
            if (!item) {
                throw new Error(`[provide-inject] injection failed: ${String(sym)}`);
            }
            return item;
        },
    };
}
