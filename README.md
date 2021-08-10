# `sto-ivscode-extensions`

Simple binary that installs vscode extentions

## Install

```shell
npm install --save-dev sto-ivscode-extensions
```

## Usage

The intended use for this is as a setup script when preparing a development environment.
Add a `postinstall` or `prepare` script that runs `sto-ivscode-extensions` and your (VSCode)development environment will be ready to go:

```json
{
  "name": "my-awesome-package",
  "scripts": {
    "prepare": "sto-ivscode-extensions"
  },
  "devDependencies": {
    "sto-ivscode-extensions": "^1.0.0"
  }
}
```

`sto-ivscode-extensions` will find the `.vscode` folder in the current working directory, load the `extensions.json` file, and run `code --install-package ${package}` for each recommended package.

Now VSCode extensions that your package recommends are installed automatically when new developers run `npm install`.
