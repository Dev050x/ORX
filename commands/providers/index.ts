import { Command } from "commander";
import { listCommand } from "./list";
import { loginCommand } from "./login";

export const providerCommand = new Command("providers")
    .description("Provider Related Information")
    .addCommand(listCommand)
    .addCommand(loginCommand)