import React from 'react';
import { Box } from 'ink';
import type { ChatMessage } from '../types';
import { Message } from './Message';

interface MessageListProps {
    messages: ChatMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    if (messages.length === 0) {
        return null;
    }

    return (
        <Box flexDirection="column" width="100%" marginBottom={1}>
            {messages.map((msg) => (
                <Message key={msg.id} message={msg} />
            ))}
        </Box>
    );
};
