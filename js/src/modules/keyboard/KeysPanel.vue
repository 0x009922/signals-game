<script lang="ts">
import { useAppStore } from '@/state';
import { KeyState, PrimaryKey } from '@/state/keyboard';
import { computed, ComputedRef, defineComponent, inject, reactive, ref, watch } from 'vue';
// import { KeysState, KEYS_INJECT_SYMBOL } from './shared';
import KeyVue from './Key.vue';

export default defineComponent({
    name: 'KeysPanel',
    components: { KeyVue },
    setup() {
        const {
            keyboard: { primaryKeys },
        } = useAppStore();

        const primaryKeysList: PrimaryKey[] = [
            PrimaryKey.CreatePowerSupply,
            PrimaryKey.CreateSensor,
            PrimaryKey.CreateBuffer,
            PrimaryKey.CreateInvertor,
            PrimaryKey.Remove,
        ];

        const keys = primaryKeysList.map<[PrimaryKey, KeyState]>((key) => [key, primaryKeys[key]]);

        return { keys };

        // const state = inject<KeysState>(KEYS_INJECT_SYMBOL)!;

        // function isKeyDown(code: string): boolean {
        //     return state.downKeys.has(code);
        // }

        // const keys: {
        //     code: string;
        //     label: string;
        //     down: ComputedRef<boolean>;
        // }[] = [
        //     { code: 'Digit1', label: '1' },
        //     { code: 'Digit2', label: '2' },
        //     { code: 'Digit3', label: '3' },
        //     { code: 'Digit4', label: '4' },
        //     { code: 'KeyR', label: 'R' },
        // ].map((key) => ({
        //     ...key,
        //     down: computed(() => isKeyDown(key.code)),
        // }));

        // // очередь зажатых клавиш
        // const downStack = reactive<string[]>([]);
        // // первая в очереди клавиша
        // const lockKeyCode = computed<string | null>(() => downStack[0] ?? null);

        // // смотрю за каждой клавишей
        // keys.forEach((x) => {
        //     watch(
        //         x.down,
        //         (val) => {
        //             if (val) {
        //                 downStack.push(x.code);
        //             } else {
        //                 const index = downStack.indexOf(x.code);
        //                 downStack.splice(index, 1);
        //             }
        //             // if (val && !lockKeyCode.value) {
        //             //     lockKeyCode.value = x.code;
        //             // }
        //             // if (!val && lockKeyCode.value === x.code) {
        //             //     lockKeyCode.value = null;
        //             // }
        //         },
        //         { immediate: true },
        //     );
        // });

        // return { keys, lockKeyCode };
    },
});
</script>

<template>
    <div class="fixed bottom-0 left-0 pointer-events-none">
        <div class="m-4 space-x-4 flex">
            <template v-for="[key, item] in keys" :key="key">
                <key-vue :label="item.label" :down="item.down" :blocked="item.block" />
            </template>
        </div>
    </div>
</template>
