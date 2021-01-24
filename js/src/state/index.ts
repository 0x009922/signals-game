import { Silicon } from '@/core/heap';
import { PowerSupplyChip } from '@/chips/power-supply';
import { InvertorChip } from '@/chips/invertor';
import { SensorChip } from '@/chips/sensor';
import { createInjectHelpers } from '@/tools/provide-inject';
import { useSilicon } from '@/core/silicon';
import { BufferChip } from '@/chips/buffer';
import { createKeyboardStore, KeyboardStore } from './keyboard';
import { createMouseStore, MouseStore } from './mouse';
// import { useLightningEnvironment } from '@/core/lightning-env';

export type AppChips = PowerSupplyChip | InvertorChip | SensorChip | BufferChip;

export interface AppStore {
    silicon: Silicon<AppChips>;
    keyboard: KeyboardStore;
    mouse: MouseStore;
}

export function createAppStore(): AppStore {
    const silicon = useSilicon<AppChips>({
        env: {
            dispatch: (act) => setTimeout(act, 100),
        },
    });

    return {
        silicon,
        keyboard: createKeyboardStore(),
        mouse: createMouseStore(),
    };
}

export const { provide: provideAppStore, use: useAppStore } = createInjectHelpers<AppStore>('Application Store');
