#!/usr/bin/env bun
import { program } from 'commander';
import { providerCommand } from './commands/providers';
import { agentCommand } from './commands/agent/agent';

program
  .name('orx')
  .description('Coding agent cli')
  .version('0.1.0')
  .addCommand(providerCommand)
  .addCommand(agentCommand)

program.parse();
