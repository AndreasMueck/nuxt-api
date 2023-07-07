<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';

const schema = {
    drink: (value) => {
        if (value) {
            return true;
        }

        return 'You must choose a drink';
    }
};

function onSubmit(values) {
    console.log(JSON.stringify(values, null, 2));
}
</script>

<template>
    <div id="app">
        <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ values }">
            <Field name="drink" type="radio" value="" /> None
            <Field name="drink" type="radio" value="Tea" /> Tea
            <Field name="drink" type="radio" value="Coffee" /> Coffee
            <ErrorMessage name="drink" />
            <br />
            <button type="submit">Submit</button>

            <p>Values</p>
            <pre>{{ values }}</pre>
        </Form>
    </div>
</template>