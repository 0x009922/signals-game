interface KeyStateStatic {
    code: string;
    label: string;
}

export interface KeyState extends KeyStateStatic {
    down: boolean;
    block: boolean;
}

export interface KeyboardStore {
    primaryKeys: {
        [K in PrimaryKey]: KeyState;
    };
    currentPrimaryAction: ComputedRef<PrimaryKey | null>;
    // secondaryKeys: ComputedRef<null | KeyboardKeyState[]>;
}

import { computed, ComputedRef, reactive, readonly, ref, watch, watchEffect } from 'vue';
import { hookedWindowAddEventListener } from '@/tools/hooked-window-events';
import { createPubSub } from '@/tools/pub-sub';
import { useQueueWithHead } from '@/tools/queue-head';

export enum PrimaryKey {
    CreatePowerSupply = 'power',
    CreateSensor = 'sensor',
    CreateBuffer = 'buff',
    CreateInvertor = 'invert',
    Remove = 'rem',
}

const primaryKeysConfig: {
    [K in PrimaryKey]: KeyStateStatic;
} = {
    [PrimaryKey.CreatePowerSupply]: {
        code: 'Digit1',
        label: '1',
    },
    [PrimaryKey.CreateSensor]: {
        code: 'Digit2',
        label: '2',
    },
    [PrimaryKey.CreateBuffer]: {
        code: 'Digit3',
        label: '3',
    },
    [PrimaryKey.CreateInvertor]: {
        code: 'Digit4',
        label: '4',
    },
    [PrimaryKey.Remove]: {
        code: 'KeyR',
        label: 'R',
    },
};

export function createKeyboardStore(): KeyboardStore {
    // const keydownCallbacks = new Map<string, () => void>();
    const keyevents = createPubSub<'keydown' | 'keyup', KeyboardEvent>();

    // const keydownKeys = new Set<string>();

    hookedWindowAddEventListener('keydown', (ev) => {
        keyevents.dispatch('keydown', ev);
    });

    hookedWindowAddEventListener('keyup', (ev) => {
        keyevents.dispatch('keyup', ev);
    });

    const keydownQueue = useQueueWithHead<PrimaryKey>();

    // const primaryKeydownQueue = reactive<string[]>([]);
    // const primaryKeydownMain = computed<string | null>(() => primaryKeydownQueue[0] ?? null);

    const primaryKeys = Object.fromEntries(
        (Object.entries(primaryKeysConfig) as [PrimaryKey, KeyStateStatic][]).map(([primKey, config]) => {
            const down = ref(false);

            keyevents.subscribe('keydown', (ev) => {
                if (ev.code === config.code) {
                    down.value = true;
                }
            });
            keyevents.subscribe('keyup', (ev) => {
                if (ev.code === config.code) {
                    down.value = false;
                }
            });

            watch(down, (val) => {
                val ? keydownQueue.push(primKey) : keydownQueue.rm(primKey);
                // if (val) {
                //     primaryKeydownQueue.push(config.code);
                // } else {
                //     const index = primaryKeydownQueue.indexOf(config.code);
                //     primaryKeydownQueue.splice(index, 1);
                // }
            });

            const block = computed<boolean>(() => !!keydownQueue.head.value && keydownQueue.head.value !== primKey);

            return [
                primKey,
                {
                    ...config,
                    down,
                    block,
                },
            ];
        }),
    );

    return {
        primaryKeys: readonly(primaryKeys) as Record<PrimaryKey, KeyState>,
        currentPrimaryAction: keydownQueue.head,
    };

    // window.addEventListener('keydown', (ev) => {
    //     // инвокаю колбэки по конкретному коду символа
    //     // if (keydownCallbacks.has(ev.code)) {
    //     //     keydownCallbacks.get(ev.code)!();
    //     // }
    // });

    // const MAIN_KEYS: { code: string; label: string }[] = [
    //     { code: 'Digit1', label: '1' },
    //     { code: 'Digit2', label: '2' },
    //     { code: 'Digit3', label: '3' },
    //     { code: 'Digit4', label: '4' },
    //     { code: 'KeyR', label: 'R' },
    // ];

    // MAIN_KEYS.forEach(({ code }) => {
    //     // подписываюсь на keydown
    // });

    // const mainKeys = MAIN_KEYS.map((x) => {});
}

// export type KeyboardStore = ReturnType<typeof createKeyboardStore>;
