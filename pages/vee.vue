<template>
    <div id="app">

        <Form @submit="onSubmit">email:
            <Field name="email" type="email" :rules="validateEmail" />
            <ErrorMessage name="email" />
            <br />name:
            <Field name="name" type="text" :rules="validateName" />
            <ErrorMessage name="name" />
            <br />
            <Field v-slot="{ field }" name="terms" type="checkbox" :value="true" :rules="validateAgree">
                <label>
                    <input type="checkbox" name="terms" v-bind="field" :value="true" />
                    I agree
                </label>
            </Field>
            <ErrorMessage name="terms" />
            <br />
            <button>Sign up for newsletter</button>
        </Form>
    </div>
</template>
<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';

const onSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
}

const validateEmail = (value) => {
    // if the field is empty
    if (!value) {
        return 'This field is required';
    }
    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
        return 'This field must be a valid email';
    }
    // All is good
    return true;
}

const validateName = (value) => {
    // if the field is empty
    if (!value) {
        return 'This field is required';
    }
    // All is good
    return true;
}

const validateAgree = (value) => {
    // if the field is empty
    if (!value) {
        return 'This field is required';
    }
    // All is good
    return true;
}

</script>
