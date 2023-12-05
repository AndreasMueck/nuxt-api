<script>
// benutze normales <script> um optionen zu deklarieren
export default {
    inheritAttrs: false  // fallthrough attribute werden nicht ausdrücklich nicht durchgereicht
}
</script>

<script setup>
import { useAttrs } from 'vue'
// class, style und id werden automatisch als s.g. Fallthrough attribute automatisch durchgereicht an die Komponente
// daher gibt es hier nur ein prop: disabled
defineProps({
    disabled: Boolean
})

const test = function ExpensiveClass() {
    return 'XXXX'
}

// Provide + Inject Beispiel -> Provide kommt aus index.vue
const message = inject('key', () => 'Erika Mustermann', true) // Zweiter Parameter ist default wenn kein Key provided wurde
console.log(message)

//const attrs = useAttrs()
//console.log(attrs)
</script>

<template>
    <div>
        <button class="button" :disabled="disabled" v-bind="$attrs">
            <slot>Default</slot>
        </button>
        {{ message }}
    </div>
</template>

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