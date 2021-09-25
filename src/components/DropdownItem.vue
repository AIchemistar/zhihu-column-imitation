<template>
    <li
        class="dropdown-option"
        :class="{'is-disabled': disabled}">
        <slot></slot>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    }
})
</script>

<style>
    /* disabled为true时，选项变成灰色表示不可选 */
    .dropdown-option.is-disabled * {
        color: #6c757d;
        pointer-events: none;
        background-color: transparent;
    }
</style>
