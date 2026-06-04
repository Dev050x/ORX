import { Command } from "commander";
import { listCommand } from "./list";
import { loginCommand } from "./login";
import { logoutCommand } from "./logout";
import { setCommand } from "./set";

export const providerCommand = new Command("providers")
    .description("Provider Related Information")
    .addCommand(listCommand)
    .addCommand(loginCommand)
    .addCommand(logoutCommand)
    .addCommand(setCommand)