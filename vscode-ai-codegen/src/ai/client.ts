class AIClient {
    private apiUrl: string;
    private apiKey: string;

    constructor(apiUrl: string, apiKey: string) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    public async generateCode(prompt: string): Promise<string> {
        const response = await this.sendRequest({ prompt, type: 'code' });
        return response;
    }

    public async generateFramework(prompt: string): Promise<string> {
        const response = await this.sendRequest({ prompt, type: 'framework' });
        return response;
    }

    private async sendRequest(data: { prompt: string; type: string }): Promise<string> {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        return result.output;
    }
}