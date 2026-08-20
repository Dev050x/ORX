#!/usr/bin/env bun

import React from 'react';
import { render } from 'ink';
import { program } from 'commander';
import { providerCommand } from './commands/providers';
import { agentCommand } from './commands/agent/agent';
import { App } from './tui/App';

function startTui() {
  render(React.createElement(App));
}

program
  .name('orx')
  .description('Coding agent cli')
  .version('0.1.0')
  .addCommand(providerCommand)
  .addCommand(agentCommand)
  .action(() => startTui());

program.parse();