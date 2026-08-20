export type MessageRole = 'user' | 'assistant' | 'tool' | 'system';

export interface ToolCallInfo {
    id: string;
    name: string;
    cmd: string;
    output?: string;
    status: 'running' | 'completed' | 'error';
}

export interface ChatMessage {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: Date;
    toolCall?: ToolCallInfo;
}
