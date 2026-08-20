import { useState, useCallback, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { callAiStream } from '../../utils/ai';
import { getDeault } from '../../utils/config';

export function useAgent() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isThinking, setIsThinking] = useState<boolean>(false);
    const [currentStatus, setCurrentStatus] = useState<string>('idle');
    const [providerInfo, setProviderInfo] = useState<{ model: string; provider: string } | null>(null);

    useEffect(() => {
        const config = getDeault();
        if (config) {
            setProviderInfo({
                model: config.model || 'gemini-2.5-flash',
                provider: 'google',
            });
        } else {
            setProviderInfo({
                model: 'Not configured',
                provider: 'none',
            });
        }
    }, []);

    const sendMessage = useCallback(async (userText: string) => {
        if (!userText.trim() || isThinking) return;

        const userMsgId = `user-${Date.now()}`;
        const userMessage: ChatMessage = {
            id: userMsgId,
            role: 'user',
            content: userText,
            timestamp: new Date(),
        };

        const assistantMsgId = `assistant-${Date.now()}`;
        const assistantMessage: ChatMessage = {
            id: assistantMsgId,
            role: 'assistant',
            content: '',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage, assistantMessage]);
        setIsThinking(true);
        setCurrentStatus('Thinking...');

        try {
            await callAiStream(userText, {
                onToken: (delta) => {
                    setCurrentStatus('Streaming response...');
                    setMessages((prev) =>
                        prev.map((msg) =>
                            msg.id === assistantMsgId
                                ? { ...msg, content: msg.content + delta }
                                : msg
                        )
                    );
                },
                onToolStart: (_name, { cmd }) => {
                    const toolMsgId = `tool-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
                    setCurrentStatus(`Running command: ${cmd}`);
                    const toolMessage: ChatMessage = {
                        id: toolMsgId,
                        role: 'tool',
                        content: cmd,
                        timestamp: new Date(),
                        toolCall: {
                            id: toolMsgId,
                            name: 'executeCommands',
                            cmd: cmd,
                            status: 'running',
                        },
                    };
                    setMessages((prev) => [...prev, toolMessage]);
                },
                onToolEnd: (_name, result) => {
                    setMessages((prev) =>
                        prev.map((msg) =>
                            msg.toolCall && msg.toolCall.status === 'running'
                                ? {
                                      ...msg,
                                      toolCall: {
                                          ...msg.toolCall,
                                          output: result,
                                          status: 'completed',
                                      },
                                  }
                                : msg
                        )
                    );
                },
                onError: (err) => {
                    setMessages((prev) =>
                        prev.map((msg) =>
                            msg.id === assistantMsgId
                                ? {
                                      ...msg,
                                      content:
                                          msg.content +
                                          `\n⚠️ Error: ${err.message || String(err)}`,
                                  }
                                : msg
                        )
                    );
                },
            });
        } catch (err: any) {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === assistantMsgId && !msg.content
                        ? {
                              ...msg,
                              content: `⚠️ Error: ${err.message || String(err)}`,
                          }
                        : msg
                )
            );
        } finally {
            setIsThinking(false);
            setCurrentStatus('idle');
        }
    }, [isThinking]);

    return {
        messages,
        isThinking,
        currentStatus,
        providerInfo,
        sendMessage,
    };
}
