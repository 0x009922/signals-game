import { Vector2Like } from '@/core/heap';
import { Vector2 } from '@/core/vec';
import { reactive, readonly } from 'vue';

export interface MouseStore {
    currentGridCell: Vector2;
    setGridCell: (vec: Vector2Like) => void;
}

export function createMouseStore(): MouseStore {
    const cell = reactive(Vector2.zero());

    function set(vec: Vector2Like) {
        cell.setFromVec(vec);
    }

    return {
        currentGridCell: readonly(cell),
        setGridCell: set,
    };
}
