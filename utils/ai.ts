import { stepCountIs, streamText, tool, type ModelMessage } from "ai";
import { execSync } from "child_process";
import { google } from "@ai-sdk/google";
import { getDeault } from "./config";
import z from "zod";

const messages: ModelMessage[] = [];



export async function callAi(content: string) {
    messages.push({
        role: "user",
        content,
    });
    const data = getDeault();
    if (!data) {
        console.log("please login first");
        return;
    }

    process.env.GOOGLE_GENERATIVE_AI_API_KEY = data.key;

    const result = streamText(({
        model: google(`${data.model}`),
        messages: messages,
        tools: {
            executeCommands: tool({
                description: "Execute command in the terminal so you can read, write, update and delete file",
                inputSchema: z.object({
                    cmd: z.string().describe("the command you want to execute"),
                }),
                execute: async ({ cmd }) => {
                    console.log("command that ai write: ", cmd);
                    const result = execSync(cmd).toString();
                    return result;
                }
            })
        },

        stopWhen: stepCountIs(100),
        onStepFinish: async ({ toolResults }) => {
            // if (toolResults.length) {
            //     console.log(JSON.stringify(toolResults, null, 2));
            // }
        },
    }));

    let response = "";
    for await (const delta of result.textStream) {
        response += delta;
    }
    messages.push({ role: 'assistant', content: response });
    console.log(response);
}