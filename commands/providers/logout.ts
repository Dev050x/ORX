import { Command } from "commander";
import { deleteAuth } from "../../utils/config";

export const logoutCommand = new Command("logout")
    .description('Lets user logout from the provider')
    .option('-p, --provider <providerName>', 'Name of the provider (gemini, claude etc)')
    .action((options) => {
        deleteAuth(options.provider);
        console.log("logout succefully");
    })