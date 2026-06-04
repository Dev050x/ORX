import { Command } from "commander";
import { listCommand } from "./list";

export const providerCommand = new Command("providers")
    .description("Provider Related Information")
    .addCommand(listCommand)