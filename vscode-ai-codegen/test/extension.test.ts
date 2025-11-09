import * as assert from 'assert';
import * as vscode from 'vscode';
import { generateCode } from '../src/commands/generateCode';
import { generateFramework } from '../src/commands/generateFramework';

suite('Extension Tests', () => {
    test('generateCode should return a valid code snippet', async () => {
        const input = 'Create a function that adds two numbers';
        const expectedOutput = 'function add(a, b) {\n    return a + b;\n}';
        
        const result = await generateCode(input);
        assert.strictEqual(result, expectedOutput);
    });

    test('generateFramework should return a valid framework structure', async () => {
        const frameworkName = 'Express';
        const expectedOutput = 'const express = require(\'express\');\nconst app = express();\n\napp.listen(3000, () => {\n    console.log(\'Server is running on port 3000\');\n});';
        
        const result = await generateFramework(frameworkName);
        assert.strictEqual(result, expectedOutput);
    });
});