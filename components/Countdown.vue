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
const duration = ref(getDuration());

onMounted(() => {
    setInterval(() => {
        duration.value = getDuration(); // Ergebnis der Funktion wird als Ergebnis zurückgegeben - duration ist ein Ref
    }, 1000);
});
</script>
<template>
    <slot v-bind="duration" />
</template>