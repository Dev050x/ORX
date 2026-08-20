import React from 'react';
import { Box, Text } from 'ink';

interface FooterProps {
    version?: string;
}

export const Footer: React.FC<FooterProps> = ({ version = '0.1.0' }) => {
    return (
        <Box width={75} justifyContent="space-between" marginTop={1}>
            <Box gap={2}>
                <Text color="gray">
                    <Text color="white" bold>tab</Text> agents
                </Text>
                <Text color="gray">
                    <Text color="white" bold>ctrl+p</Text> commands
                </Text>
            </Box>
            <Text color="gray" dimColor>
                v{version}
            </Text>
        </Box>
    );
};
