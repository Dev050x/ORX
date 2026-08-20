import React from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import type { ChatMessage } from '../types';

interface MessageProps {
    message: ChatMessage;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
    if (message.role === 'user') {
        return (
            <Box flexDirection="column" marginY={1}>
                <Box>
                    <Text color="cyan" bold>❯ </Text>
                    <Text bold color="white">{message.content}</Text>
                </Box>
            </Box>
        );
    }

    if (message.role === 'tool') {
        const { toolCall } = message;
        const isRunning = toolCall?.status === 'running';

        return (
            <Box flexDirection="column" marginY={0} paddingLeft={2}>
                <Box gap={1}>
                    {isRunning ? (
                        <Text color="yellow">
                            <Spinner type="dots" />
                        </Text>
                    ) : (
                        <Text color="green">⚡</Text>
                    )}
                    <Text color="cyan" dimColor>exec:</Text>
                    <Text color="yellow" bold>{toolCall?.cmd || message.content}</Text>
                </Box>
                {toolCall?.output && (
                    <Box paddingLeft={3} marginTop={0}>
                        <Text color="gray">
                            {toolCall.output.length > 300
                                ? toolCall.output.slice(0, 300) + '... (truncated)'
                                : toolCall.output}
                        </Text>
                    </Box>
                )}
            </Box>
        );
    }

    // Assistant role
    return (
        <Box flexDirection="column" marginY={1} paddingLeft={2}>
            {message.content ? (
                <Text color="white">{message.content}</Text>
            ) : (
                <Box gap={1}>
                    <Text color="cyan">
                        <Spinner type="dots" />
                    </Text>
                    <Text color="gray" italic>Generating response...</Text>
                </Box>
            )}
        </Box>
    );
};
