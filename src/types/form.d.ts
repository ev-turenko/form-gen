export interface FormField {
    name: string;
    label: string;
    type: 'input' | 'select' | 'checkbox' | 'textarea';
    attrs?: FieldAttrs;
    options?: { value: string; label: string }[];
    regex?: RegExp;
    errorMessage?: string;
    required?: boolean;
}

export interface FieldAttrs {
    description?: string;
    type?: string;
    rows?: number;
    [key: string]: any;
}