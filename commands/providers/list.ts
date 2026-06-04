import { Command } from "commander";
import info from "./provider.json";

export const listCommand = new Command("list")
    .description("describe the list of providers")
    .action(() => {
        console.log("\n=== Available Models ===\n");
        info.providers.forEach((provider) => {
            console.log(`[${provider.name}]`);
            provider.models.forEach((model) => {
                console.log(`  └─ ${model}`);
            });
            console.log();
        });
    });