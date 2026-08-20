import React from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';

interface StatusBarProps {
    isThinking: boolean;
    currentStatus: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({
    isThinking,
    currentStatus,
}) => {
    if (!isThinking) return null;

    return (
        <Box marginTop={1} gap={1} alignItems="center">
            <Text color="cyan">
                <Spinner type="dots" />
            </Text>
            <Text color="gray" italic>
                {currentStatus}
            </Text>
        </Box>
    );
};
