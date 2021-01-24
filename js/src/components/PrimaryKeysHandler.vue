<script lang="ts">
import { setupBufferChip } from '@/chips/buffer';
import { setupInvertor } from '@/chips/invertor';
import { setupPowerSupply } from '@/chips/power-supply';
import { setupSensor } from '@/chips/sensor';
import { useAppStore } from '@/state';
import { PrimaryKey } from '@/state/keyboard';
import { computed, defineComponent, watch } from 'vue';

export default defineComponent({
    name: 'PrimaryKeysHandler',
    setup() {
        const {
            keyboard: {
                // primaryKeys,
                currentPrimaryAction,
            },
            mouse: { currentGridCell },
            silicon,
        } = useAppStore();

        const actions: {
            [K in PrimaryKey]: () => void;
        } = {
            [PrimaryKey.Remove]: () => silicon.unmount(currentGridCell),
            [PrimaryKey.CreateBuffer]: () => silicon.mount(currentGridCell, setupBufferChip),
            [PrimaryKey.CreateInvertor]: () => silicon.mount(currentGridCell, setupInvertor),
            [PrimaryKey.CreatePowerSupply]: () => silicon.mount(currentGridCell, setupPowerSupply),
            [PrimaryKey.CreateSensor]: () => silicon.mount(currentGridCell, setupSensor),
        };

        const isCellContainsAnything = computed<boolean>(() => {
            for (const { pos } of silicon.elems.value) {
                if (currentGridCell.equals(pos)) return true;
            }
            return false;
        });

        // если в клетке что-то есть и кнопка удаления зажата, то удалить
        // если в клетке ничего нет и зажата кнопка, но не удаления, то создать зажатое

        watch(
            [isCellContainsAnything, currentPrimaryAction],
            () => {
                const primKey = currentPrimaryAction.value;
                if (primKey) {
                    if (
                        primKey &&
                        ((primKey === PrimaryKey.Remove && isCellContainsAnything.value) ||
                            (primKey !== PrimaryKey.Remove && !isCellContainsAnything.value))
                    ) {
                        actions[primKey]();
                        // silicon.unmount(currentGridCell);
                    }
                }
                // if (primKey) {
                //     if (primKey)
                // }
            },
            { immediate: true },
        );

        return () => null;
    },
});
</script>
