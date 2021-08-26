#!/usr/bin/env node
const which = require('which');
const child_process = require('child_process');

const binary = which.sync('code', { nothrow: true });
if (!binary) {
  console.log('VS Code not found');
  return;
}

const installExt = '--install-extension';
const recommendations = [
  'dbaeumer.vscode-eslint',
  'eamodio.gitlens',
  'EditorConfig.EditorConfig',
  'esbenp.prettier-vscode',
  'stylelint.vscode-stylelint',
];
const args = recommendations.reduce((args, rec) => {
  args.push(installExt);
  args.push(rec);
  return args;
}, []);

const vscode = child_process.spawn(binary, args);

vscode.stdout.on('data', (data) => process.stdout.write(data));
vscode.stderr.on('data', (data) => process.stderr.write(data));
