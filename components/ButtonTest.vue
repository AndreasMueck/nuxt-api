<template>
    <div>
        <button class="button" :disabled="disabled" v-bind="$attrs">
            <slot>Default</slot>
        </button>
        {{ message }}
    </div>
</template>

<script>
// use normal <script> to declare options
export default {
    inheritAttrs: false
}
</script>

<script setup>
import { useAttrs } from 'vue'
// Props sind nicht notwendig, weil Button class, style und id erhält => Fallthrough attribute werden automatisch durchgereicht an die Komponente
defineProps({
    disabled: Boolean
})

const test = function ExpensiveClass() {
    return 'XXXX'
}

const message = inject('key', () => 'Bob Day', true) // Zweiter Parameter ist default wenn kein Key provided wurde
console.log(message)

const attrs = useAttrs()
//console.log(attrs)
</script>

<style>
.button {
    padding: 14px 28px;
    font-size: 16px;
    cursor: pointer;
}

.rot {
    color: white;
    background-color: red;
    border-color: red;
}

.grau {
    color: white;
    background-color: lightslategray;
    border-color: lightslategray;
}

.gruen {
    color: white;
    background-color: green;
    border-color: green;
}
</style>