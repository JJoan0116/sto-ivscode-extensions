#!/usr/bin/env node
const which = require('which');
const child_process = require('child_process');
const inquirer = require('inquirer');

const binary = which.sync('code', { nothrow: true });
if (!binary) {
  console.log('VS Code not found');
  return;
}

// 强制安装
const mustExtensions = [
  'dbaeumer.vscode-eslint',
  'eamodio.gitlens',
  'EditorConfig.EditorConfig',
  'esbenp.prettier-vscode',
  'stylelint.vscode-stylelint',
];

// 建议安装
const recommendExtensions = [
  'formulahendry.auto-complete-tag',
  'burkeholland.simple-react-snippets',
  'naumovs.color-highlight',
  'wayou.vscode-todo-highlight',
  'wix.vscode-import-cost',
];

// 建议安装列表
const promptList = [
  {
    type: 'input',
    message: `is install auto-complete-tag(自动闭合标签) (y/n)`,
    name: 'auto-complete-tag',
  },
  {
    type: 'input',
    message: `is install simple-react-snippets(提供react相关的快捷指令) (y/n)`,
    name: 'simple-react-snippets',
  },
  {
    type: 'input',
    message: `is install color-highlight(为css中颜色相关的代码展示对应的颜色) (y/n)`,
    name: 'color-highlight',
  },
  {
    type: 'input',
    message: `is install vscode-todo-highlight(高亮TODO) (y/n)`,
    name: 'vscode-todo-highlight',
  },
  {
    type: 'input',
    message: `is install vscode-import-cost(内联显示导入包的大小) (y/n)`,
    name: 'vscode-import-cost',
  },
];

// 控制台询问
inquirer.prompt(promptList).then((answers) => {
  Object.keys(answers).forEach((item) => {
    if (answers[item] === 'y') {
      const completeItem = recommendExtensions.find((v) => v.indexOf(item) > 0);
      if (completeItem) {
        mustExtensions.push(completeItem);
      }
    }
  });

  const installExt = '--install-extension';
  const args = mustExtensions.reduce((args, rec) => {
    args.push(installExt);
    args.push(rec);
    return args;
  }, []);

  const vscode = child_process.spawn(binary, args);
  vscode.stdout.on('data', (data) => process.stdout.write(data));
  vscode.stderr.on('data', (data) => process.stderr.write(data));
});
