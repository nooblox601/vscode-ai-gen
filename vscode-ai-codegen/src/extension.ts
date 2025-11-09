import * as vscode from 'vscode';
import { generateCode } from './commands/generateCode';
import { generateFramework } from './commands/generateFramework';

export function activate(context: vscode.ExtensionContext) {
    const generateCodeCommand = vscode.commands.registerCommand('extension.generateCode', generateCode);
    const generateFrameworkCommand = vscode.commands.registerCommand('extension.generateFramework', generateFramework);

    context.subscriptions.push(generateCodeCommand);
    context.subscriptions.push(generateFrameworkCommand);
}

export function deactivate() {}