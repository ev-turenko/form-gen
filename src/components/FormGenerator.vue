<template>
    <form ref="formRef" @submit.prevent="handleSave" class="form-generator">
        <div class="form-generator__top">
            <slot name="formTop"></slot>
        </div>
        
        <div v-for="(field, index) in fields" :key="index" class="form-generator__field">
            <label :for="field.name" class="form-generator__label">{{ field.label }}</label>

            <template v-if="!$slots[field.name]">
                <input 
                    v-if="field.type === 'input'" 
                    :id="field.name" 
                    v-model="formData[field.name]" 
                    v-bind="field.attrs"
                    @blur="validateField(field)"
                    class="form-generator__input"
                    :class="{ 'form-generator__input--error': errors[field.name] }"
                />

                <select 
                    v-else-if="field.type === 'select'" 
                    :id="field.name" 
                    v-model="formData[field.name]"
                    v-bind="field.attrs"
                    @change="validateField(field)"
                    class="form-generator__select"
                    :class="{ 'form-generator__select--error': errors[field.name] }"
                >
                    <option v-for="option in field.options" :value="option.value" :key="option.value">
                        {{ option.label }}
                    </option>
                </select>

                <div v-else-if="field.type === 'checkbox'" class="form-generator__checkbox-wrapper">
                    <input 
                        :id="field.name" 
                        type="checkbox" 
                        v-model="formData[field.name]"
                        v-bind="field.attrs"
                        @change="validateField(field)"
                        class="form-generator__checkbox"
                    />
                    <span 
                        v-if="field.attrs?.description" 
                        class="form-generator__checkbox-description"
                        @click="toggleCheckbox(field.name)"
                    >
                        {{ field.attrs.description }}
                    </span>
                </div>

                <textarea 
                    v-else-if="field.type === 'textarea'" 
                    :id="field.name" 
                    v-model="formData[field.name]"
                    v-bind="field.attrs"
                    @blur="validateField(field)"
                    class="form-generator__textarea"
                    :class="{ 'form-generator__textarea--error': errors[field.name] }"
                ></textarea>
            </template>

            <span v-if="errors[field.name]" class="form-generator__error">
                {{ errors[field.name] }}
            </span>

            <slot :name="field.name" :field="field" :value="formData[field.name]"></slot>
        </div>

        <div class="form-generator__bottom">
            <slot name="formBottom"></slot>
        </div>

        <div class="form-generator__actions">
            <button type="submit" :disabled="hasErrors" class="form-generator__button form-generator__button--primary">
                Сохранить
            </button>
            <button type="button" @click="handleCancel" class="form-generator__button form-generator__button--secondary">
                Отмена
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { FormField } from '../types/form';

const props = defineProps<{
    fields: FormField[];
    modelValue: Record<string, any>;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: Record<string, any>): void;
    (e: 'save', value: Record<string, any>): void;
    (e: 'cancel'): void;
    (e: 'error', errors: Record<string, string>): void;
}>();

const formRef = ref<HTMLFormElement | null>(null);
const errors = ref<Record<string, string>>({});

const formData = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value);
        validateAllFields();
    },
});

const hasErrors = computed(() => Object.keys(errors.value).length > 0);

const toggleCheckbox = (fieldName: string) => {
    formData.value[fieldName] = !formData.value[fieldName];
    validateField(props.fields.find(field => field.name === fieldName)!);
};

const validateField = (field: FormField) => {
    const value = formData.value[field.name];
    
    delete errors.value[field.name];

    if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        errors.value[field.name] = field.errorMessage || `Поле "${field.label}"" обязательно для заполнения`;
        return false;
    }

    if (field.regex && value && typeof value === 'string' && !field.regex.test(value)) {
        errors.value[field.name] = field.errorMessage || `Неправильный формат поля ${field.label}`;
        return false;
    }

    return true;
};

const validateAllFields = () => {
    errors.value = {};
    let isValid = true;
    
    props.fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    emit('error', errors.value);
    return isValid;
};

const handleSave = () => {
    if (validateAllFields()) {
        emit('save', formData.value);
    }
};

const handleCancel = () => {
    errors.value = {};
    emit('error', errors.value);
    emit('cancel');
};
</script>

<style lang="scss" scoped>
.form-generator {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 480px;
    margin: 0 auto;
    padding: 1.5rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    &__field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    &__label {
        color: #333;
        font-size: 1rem;
        font-weight: 500;
    }

    &__input,
    &__select,
    &__textarea {
        padding: 0.75rem;
        border: 1px solid #d2d2d7;
        border-radius: 8px;
        background: #f5f5f7;
        font-size: 1rem;
        color: #1d1d1f;
        transition: border-color 0.2s;

        &:focus {
            outline: none;
            border-color: #007aff;
        }

        &--error {
            border-color: #ff3b30;
            background: #fff5f5;
        }
    }

    &__checkbox-wrapper {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    &__checkbox {
        width: 1.25rem;
        height: 1.25rem;
        accent-color: #007aff;
    }

    &__textarea {
        min-height: 80px;
        resize: vertical;
    }

    &__error {
        color: #ff3b30;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }

    &__actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }

    &__button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: opacity 0.2s;

        &--primary {
            background: #007aff;
            color: #fff;

            &:disabled {
                opacity: 0.4;
                cursor: not-allowed;
            }

            &:hover:not(:disabled) {
                opacity: 0.9;
            }
        }

        &--secondary {
            background: transparent;
            color: #007aff;
            border: 1px solid #007aff;

            &:hover {
                background: rgba(0, 122, 255, 0.1);
            }
        }
    }

    &__top,
    &__bottom {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}
</style>