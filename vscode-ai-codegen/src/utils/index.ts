import { format } from 'prettier';

// Utility function to format code snippets
export const formatCode = (code: string): string => {
    return format(code, { parser: 'typescript' });
};

// Utility function to handle errors
export const handleError = (error: Error): void => {
    console.error('An error occurred:', error.message);
};

// Utility function to generate a unique identifier
export const generateId = (): string => {
    return `id_${Math.random().toString(36).substr(2, 9)}`;
};