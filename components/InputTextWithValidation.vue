<template>
    <div class="field">
        <label :for="name">{{ label }}</label>
        <InputText v-model="value" :aria-describedby="`${name}-help`" :class="{ 'p-invalid': errorMessage }" :type="type" />
        <small :id="`${name}-help`" class="p-error">{{ errorMessage }}</small>
    </div>
</template>

<script setup>
import { useField } from 'vee-validate';
import InputText from 'primevue/inputtext';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
});

const { errorMessage, value } = useField(toRef(props, 'name'));
</script>

<style lang="postcss" scoped>
.field * {
    display: block;
}
</style>
