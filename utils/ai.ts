import { stepCountIs, streamText, tool, type ModelMessage } from "ai";
import { execSync } from "child_process";
import { google } from "@ai-sdk/google";
import { getDeault } from "./config";
import z from "zod";

const messages: ModelMessage[] = [];



export interface StreamCallbacks {
    onToken?: (textDelta: string) => void;
    onToolStart?: (toolName: string, args: { cmd: string }) => void;
    onToolEnd?: (toolName: string, result: string) => void;
    onError?: (error: Error) => void;
}

export function getMessages() {
    return messages;
}

export function clearMessages() {
    messages.length = 0;
}

export async function callAiStream(content: string, callbacks: StreamCallbacks = {}) {
    messages.push({
        role: "user",
        content,
    });
    const data = getDeault();
    if (!data) {
        throw new Error("No default provider configured. Please run 'orx providers login' first.");
    }

    process.env.GOOGLE_GENERATIVE_AI_API_KEY = data.key;

    try {
        const result = streamText({
            model: google(`${data.model}`),
            messages: messages,
            system: "You are orx, a CLI coding agent. You help users read, write, update and delete files by executing shell commands. Always use tools to interact with the filesystem. Be concise. give normal answer to normal question",
            tools: {
                executeCommands: tool({
                    description: "Execute command in the terminal so you can read, write, update and delete file",
                    inputSchema: z.object({
                        cmd: z.string().describe("the command you want to execute"),
                    }),
                    execute: async ({ cmd }) => {
                        callbacks.onToolStart?.("executeCommands", { cmd });
                        let output = "";
                        try {
                            output = execSync(cmd, { cwd: process.cwd() }).toString();
                        } catch (err: any) {
                            output = err?.stderr?.toString() || err?.message || String(err);
                        }
                        callbacks.onToolEnd?.("executeCommands", output);
                        return output;
                    }
                })
            },
            stopWhen: stepCountIs(100),
        });

        let response = "";
        for await (const delta of result.textStream) {
            response += delta;
            callbacks.onToken?.(delta);
        }
        messages.push({ role: 'assistant', content: response });
        return response;
    } catch (err: any) {
        callbacks.onError?.(err);
        throw err;
    }
}

export async function callAi(content: string) {
    let response = "";
    await callAiStream(content, {
        onToken: (delta) => {
            process.stdout.write(delta);
            response += delta;
        },
        onToolStart: (_name, { cmd }) => {
            console.log("\n[tool] running command: ", cmd);
        }
    });
    console.log("\n");
    return response;
}