import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFormStore = defineStore('form', () => {
    const formData = ref<Record<string, any>>({});

    const updateFormData = (data: Record<string, any>) => {
        formData.value = { ...formData.value, ...data };
    };

    const resetFormData = () => {
        formData.value = {};
    };

    return { formData, updateFormData, resetFormData };
});