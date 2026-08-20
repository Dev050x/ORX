import React from 'react';
import { Box, Text } from 'ink';

export const Header: React.FC = () => {
    const logo = `
 ██████╗ ██████╗ ██╗  ██╗
██╔═══██╗██╔══██╗╚██╗██╔╝
██║   ██║██████╔╝ ╚███╔╝ 
██║   ██║██╔══██╗ ██╔██╗ 
╚██████╔╝██║  ██║██╔╝ ██╗
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
`;

    return (
        <Box flexDirection="column" alignItems="center" marginY={1}>
            <Text color="cyan" bold>
                {logo}
            </Text>
        </Box>
    );
};
