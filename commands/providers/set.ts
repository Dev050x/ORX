import { Command } from "commander";
import { setDefault } from "../../utils/config";

export const setCommand = new Command("set")
    .description("Lets user set the default provider")
    .argument('<provider>', 'Provider name and optional model (e.g., google/gemini-1.5-flash)')
    .action((provider) => {
        const parts = provider.toString().split("/");
        const pName = parts[0] || "google";
        const mName = parts[1];
        setDefault(pName, mName);
        console.log(`Successfully set provider to "${pName}" and model to "${mName}".`);
    })