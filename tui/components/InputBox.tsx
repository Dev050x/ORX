import React, { useState } from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';

interface InputBoxProps {
    onSubmit: (value: string) => void;
    isDisabled?: boolean;
    providerInfo?: { model: string; provider: string } | null;
}

export const InputBox: React.FC<InputBoxProps> = ({
    onSubmit,
    isDisabled = false,
    providerInfo,
}) => {
    const [value, setValue] = useState('');

    const handleSubmit = (submittedValue: string) => {
        if (!submittedValue.trim() || isDisabled) return;
        onSubmit(submittedValue);
        setValue('');
    };

    const modelLabel = providerInfo
        ? `Build · ${providerInfo.provider} / ${providerInfo.model}`
        : 'Build · Google Gemini';

    return (
        <Box
            flexDirection="column"
            borderStyle="round"
            borderColor="gray"
            paddingX={2}
            paddingY={0}
            width={75}
        >
            <Box marginY={0}>
                <TextInput
                    value={value}
                    onChange={setValue}
                    onSubmit={handleSubmit}
                    placeholder='Ask anything... "Fix broken tests"'
                    focus={!isDisabled}
                />
            </Box>
            <Box marginTop={1}>
                <Text color="blue" dimColor>
                    {modelLabel}
                </Text>
            </Box>
        </Box>
    );
};
