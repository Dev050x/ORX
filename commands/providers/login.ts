import { Command } from "commander";
import { writeAuth } from "../../utils/config";

export const loginCommand = new Command("login")
    .description("Lets user login into the provider")
    .option('-p, --provider <providerName>', "Name of the provider (gemini, claude etc)")
    .option("-a, --api_key <apiKey>", "Your api key")
    .action((options) => {
        console.log("providers name: ", options.provider);
        console.log("api key: ", options.api_key);
        writeAuth(options.provider, "api", options.api_key);
    })