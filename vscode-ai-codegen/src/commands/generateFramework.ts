import { commands, window } from 'vscode';
import { AIClient } from '../ai/client';
import { generateFrameworkPrompt } from '../ai/prompts';

export async function generateFramework() {
    const frameworkName = await window.showInputBox({
        placeHolder: 'Enter the framework name (e.g., React, Angular, Vue)',
    });

    if (!frameworkName) {
        window.showErrorMessage('Framework name is required.');
        return;
    }

    const aiClient = new AIClient();
    const prompt = generateFrameworkPrompt(frameworkName);

    try {
        const response = await aiClient.sendRequest(prompt);
        window.showInformationMessage(`Framework ${frameworkName} generated successfully!`);
        // Here you would typically handle the response and create the framework files
    } catch (error) {
        window.showErrorMessage(`Error generating framework: ${error.message}`);
    }
}