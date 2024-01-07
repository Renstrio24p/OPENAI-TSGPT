export type GPT_types = {
    method: string;
    headers: {
        Authorization: string;
        "Content-Type": string;
    };
    body: {
        model: string | null;
        messages: [
            {
                role: string | null;
                content: string | null;
                max_tokens?: number;
            }
        ];
    };
};