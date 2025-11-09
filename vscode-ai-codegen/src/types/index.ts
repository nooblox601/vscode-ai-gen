export interface CodeGenerationRequest {
    language: string;
    framework?: string;
    codeSnippet: string;
}

export interface CodeGenerationResponse {
    generatedCode: string;
    errors?: string[];
}

export interface FrameworkGenerationRequest {
    framework: string;
    options: Record<string, any>;
}

export interface FrameworkGenerationResponse {
    success: boolean;
    message: string;
    generatedFiles?: string[];
}

export interface AIResponse {
    data: string;
    error?: string;
}