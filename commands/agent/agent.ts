import { Command } from "commander";
import { callAi } from "../../utils/ai";


export const agentCommand = new Command("agent")
  .description('Runs the agent')
  .option('-p, --prompt <prompt>', 'prompt', '')
  .action(async (options) => {
    console.log("data: ", options.prompt);
    const response = await callAi(options.prompt);
    console.log("response");
  });