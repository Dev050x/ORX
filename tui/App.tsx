import React from 'react';
import { Box, useApp, useInput } from 'ink';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { InputBox } from './components/InputBox';
import { StatusBar } from './components/StatusBar';
import { Footer } from './components/Footer';
import { useAgent } from './hooks/useAgent';

export const App: React.FC = () => {
    const { exit } = useApp();
    const {
        messages,
        isThinking,
        currentStatus,
        providerInfo,
        sendMessage,
    } = useAgent();

    useInput((input, key) => {
        if (key.ctrl && input === 'c') {
            exit();
        }
    });

    return (
        <Box flexDirection="column" alignItems="center" width="100%" padding={1}>
            {messages.length === 0 && <Header />}

            
            <Box width={75} flexDirection="column">
                <MessageList messages={messages} />
            </Box>

            <InputBox
                onSubmit={sendMessage}
                isDisabled={isThinking}
                providerInfo={providerInfo}
            />

            <StatusBar isThinking={isThinking} currentStatus={currentStatus} />

            <Footer version="0.1.0" />
        </Box>
    );
};

export default App;
