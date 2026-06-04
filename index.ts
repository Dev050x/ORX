import { program } from 'commander';
import { providerCommand } from './commands/providers';

program
  .name('opencode')
  .description('Coding agent cli')
  .version('0.1.0')
  .addCommand(providerCommand);

program.parse();
