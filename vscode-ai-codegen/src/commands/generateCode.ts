import * as vscode from 'vscode';
import { AIClient } from '../ai/client';
import { getCodeGenerationPrompt } from '../ai/prompts';

export async function generateCode() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found.');
        return;
    }

    const userInput = await vscode.window.showInputBox({
        placeHolder: 'Enter your code requirements...',
    });

    if (!userInput) {
        vscode.window.showErrorMessage('No input provided.');
        return;
    }

    const aiClient = new AIClient();
    const prompt = getCodeGenerationPrompt(userInput);
    
    try {
        const generatedCode = await aiClient.generateCode(prompt);
        editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, generatedCode);
        });
        vscode.window.showInformationMessage('Code generated successfully!');
    } catch (error) {
        vscode.window.showErrorMessage('Error generating code: ' + error.message);
    }
}