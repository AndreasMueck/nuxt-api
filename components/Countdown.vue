<script setup>
import { intervalToDuration } from 'date-fns';

const props = defineProps({
    timestamp: { // ist das Ende der Zeit‚
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

const duration = ref(getDuration());

onMounted(() => {
    setInterval(() => {
        duration.value = getDuration(); // Ergebnis der Funktion wird als Ergebnis zurückgegeben - duration ist ein Ref
    }, 1000); // 1000ms = 1 Sek
});

console.log(`Der Countdown ist ${duration.value.days}:${duration.value.hours}:${duration.value.minutes}:${duration.value.seconds}`)
</script>

<template>
    <slot v-bind="duration" /> <!-- Zurückmelden an Eltern-Komponente -->
</template>