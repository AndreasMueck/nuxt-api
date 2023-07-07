<template>
    <div class="q-pl-md">
        <h1 class="text-h4 text-weight-bold">PrimeVue + vee-validate v4</h1>
        <div class="q-mt-md q-gutter-md" style="max-width: 300px">
            <Form :validation-schema="schema" @submit="onSubmit">

                <!-- This uses a Higher-order component approach -->
                <Field name="email" v-slot="{ field, errorMessage }">
                    <div class="field">
                        <label for="email">Email</label>
                        <InputText v-bind="field" aria-describedby="email-help" :class="{ 'p-invalid': errorMessage }" />
                        <small id="email-help" class="p-error">{{ errorMessage }}</small>
                    </div>
                </Field>

                <!-- This uses the composition API to create a prime component with validation baked in -->
                <InputTextWithValidation name="fullName" label="Full name" />

                <InputTextWithValidation name="password" label="Password" type="password" />

                <!-- This uses a Higher-order component approach -->
                <Field name="type" v-slot="{ value, errorMessage, handleChange }">
                    <div class="field">
                        <label for="type">Type</label>
                        <Dropdown @update:model-value="handleChange" :model-value="value" :options="options"
                            optionLabel="name" optionValue="value" placeholder="Select a type" />

                        <small id="email-help" class="p-error">{{ errorMessage }}</small>
                    </div>
                </Field>

                <DropdownWithValidation label="Tenure" :options="tenureOptions" name="tenure" />

                <div class="footer">
                    <Button label="Submit" type="submit" />

                    <Button label="Reset" type="reset" class="p-button-secondary" />
                </div>
            </Form>
        </div>
    </div>
</template>

<script setup>
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import InputTextWithValidation from '../components/InputTextWithValidation.vue';
import DropdownWithValidation from '../components/DropdownWithValidation.vue';
import Button from 'primevue/button';

const schema = yup.object({
    email: yup.string().required().email().label('Email address'),
    fullName: yup.string().required().label('Full name'),
    password: yup.string().required().min(6).label('Password'),
    type: yup.string().required().label('Account type'),
    tenure: yup.string().required().label('Tenure'),
});

function onSubmit(values, actions) {
    console.log(JSON.stringify(values, null, 2));
    actions.resetForm();
}

const options = ['Enterprise', 'Pro', 'Freelance'].map((o) => ({
    name: o,
    value: o.toLowerCase(),
}));

const tenureOptions = ['Yearly', 'Monthly', 'Quartarly'].map((o) => ({
    name: o,
    value: o.toLowerCase(),
}));
</script>

<style scoped>
body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica,
        Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}

label {
    display: block;
    margin-top: 20px;
    margin-bottom: 4px;
}

.footer {
    margin-top: 20px;
    display: flex;
    gap: 10px;
}

.p-error {
    display: block;
}
</style>
