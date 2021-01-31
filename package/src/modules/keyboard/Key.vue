<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Key',
    props: {
        label: {
            type: String,
            required: true,
        },
        down: Boolean,
        blocked: Boolean,
    },
});
</script>

<template>
    <div
        :class="{
            'key-vue p-4 flex items-center justify-center w-6 h-6': true,
            'key-vue--down': down,
            'key-vue--blocked': blocked,
        }"
    >
        {{ label }}
    </div>
</template>

<style lang="sass">
.key-vue
    background: rgba(255, 0, 0, 0.2)
    border: 2px dashed rgb(255, 0, 0)
    color: white

    // &--down.&--blocked
        // background: rgba(, 0, 0, 0.5)

    &--down
        background: rgba(255, 0, 0, 1)

    &--blocked
        opacity: 0.2
</style>
