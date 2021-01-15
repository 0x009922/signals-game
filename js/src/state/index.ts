import { Silicon } from '@/core/heap';
import { PowerSupplyChip } from '@/chips/power-supply';
import { InvertorChip } from '@/chips/invertor';
import { SensorChip } from '@/chips/sensor';
import { createInjectHelpers } from '@/tools/provide-inject';
import { useSilicon } from '@/core/silicon';
import { useLightningEnvironment } from '@/core/lightning-env';

export type AppChips = PowerSupplyChip | InvertorChip | SensorChip;

export interface AppStore {
    silicon: Silicon<AppChips>;
}

export function createAppStore(): AppStore {
    const silicon = useSilicon<AppChips>({
        env: {
            dispatch: (act) => setTimeout(act, 300),
        },
    });

    return {
        silicon,
    };
}

export const { provide: provideAppStore, use: useAppStore } = createInjectHelpers<AppStore>('Application Store');
