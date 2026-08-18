#!/usr/bin/env bun

import { program } from 'commander';
import { providerCommand } from './commands/providers';
import { agentCommand } from './commands/agent/agent';
import { callAi } from './utils/ai';
import readline from 'readline';

function startTui() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("orx v0.1.0 — type 'exit' to quit\n");

  function prompt() {
    rl.question("orx> ", async (input) => {
      if (!input.trim()) { prompt(); return; }
      if (input === "exit") { rl.close(); return; }
      await callAi(input);
      prompt();
    });
  }

  prompt();
}

program
  .name('orx')
  .description('Coding agent cli')
  .version('0.1.0')
  .addCommand(providerCommand)
  .addCommand(agentCommand)
  .action(() => startTui());  // always start TUI

program.parse();