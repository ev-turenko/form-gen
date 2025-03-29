<template>
    <div class="demo-page">
        <h1>Форма 1</h1>
        <FormGenerator :fields="fields" v-model="formData" @save="handleSave" @cancel="handleCancel">
        </FormGenerator>
    </div>
</template>

<script setup lang="ts">
import FormGenerator from '../components/FormGenerator.vue';
import type { FormField } from '../types/form';
import { useFormStore } from '../stores/form';
import { storeToRefs } from 'pinia';

const formStore = useFormStore();
const refStore  = storeToRefs (formStore);
const formData = refStore.formData;

const fields: FormField[] = [
    { name: 'email', label: 'Эл. почта', type: 'input', attrs: { type: 'email' } } as const,
    {
        name: 'role',
        label: 'Роль',
        type: 'select',
        options: [
            { value: 'user', label: 'User' },
            { value: 'admin', label: 'Admin' },
        ]
    } as const,
    { name: 'subscribe', label: 'Подписка', type: 'checkbox', attrs: { description: 'Согласие на продажу души' } } as const,
];


const handleSave = (data: Record<string, any>) => {
    console.log('Form 1 Saved:', data);
    formStore.updateFormData(data);
};

const handleCancel = () => {
    console.log('Form 1 Cancelled');
    formStore.resetFormData();
};
</script>

<style lang="scss" scoped>
.demo-page {
    padding: 2rem;

    .custom-input {
        border: 2px solid #007bff;
        padding: 0.5rem;
        border-radius: 4px;
    }
}
</style>