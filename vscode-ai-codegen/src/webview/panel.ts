import * as vscode from 'vscode';

export class Panel {
    public static currentPanel: Panel | undefined;

    private readonly panel: vscode.WebviewPanel;
    private readonly extensionUri: vscode.Uri;

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this.panel = panel;
        this.extensionUri = extensionUri;

        this.panel.onDidDispose(() => this.dispose(), null, context.subscriptions);
        this.panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'generateCode':
                        this.handleGenerateCode(message);
                        return;
                    case 'generateFramework':
                        this.handleGenerateFramework(message);
                        return;
                }
            },
            null,
            context.subscriptions
        );

        this.update();
    }

    public static render(context: vscode.ExtensionContext) {
        if (Panel.currentPanel) {
            Panel.currentPanel.panel.reveal(vscode.ViewColumn.One);
            Panel.currentPanel.update();
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'aiCodeGen',
            'AI Code Generator',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [context.extensionUri]
            }
        );

        Panel.currentPanel = new Panel(panel, context.extensionUri);
    }

    private update() {
        this.panel.title = 'AI Code Generator';
        this.panel.webview.html = this.getHtmlForWebview(this.panel.webview);
    }

    private getHtmlForWebview(webview: vscode.Webview) {
        const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'style.css'));
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'script.js'));

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="${styleUri}" rel="stylesheet">
            <title>AI Code Generator</title>
        </head>
        <body>
            <h1>Welcome to AI Code Generator</h1>
            <div id="inputArea">
                <textarea id="codeInput" placeholder="Enter your code request here..."></textarea>
                <button id="generateCodeButton">Generate Code</button>
                <button id="generateFrameworkButton">Generate Framework</button>
            </div>
            <div id="outputArea"></div>
            <script src="${scriptUri}"></script>
        </body>
        </html>`;
    }

    private handleGenerateCode(message: any) {
        // Logic to handle code generation
    }

    private handleGenerateFramework(message: any) {
        // Logic to handle framework generation
    }

    private dispose() {
        Panel.currentPanel = undefined;
        this.panel.dispose();
    }
}