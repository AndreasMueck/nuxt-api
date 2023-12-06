<script setup>
import { intervalToDuration } from 'date-fns';

const props = defineProps({
    timestamp: {
        type: Number,
        required: true,
    },
});

function getDuration() {
    return intervalToDuration({
        start: Date.now(),
        end: props.timestamp,
    });
}

const $duration = ref(getDuration());

onMounted(() => {
    setInterval(() => {
        $duration.value = getDuration(); // Ergebnis der Funktion wird als Ergebnis zurückgegeben - duration ist ein Ref
    }, 1000);
});

console.log(`Die Zeit ist ${$duration.value.seconds}`)
</script>

<template>
    <slot v-bind="$duration" /> <!-- Zurückmelden an Eltern-Komponente -->
</template>