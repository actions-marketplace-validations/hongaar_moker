# moker [![npm](https://img.shields.io/npm/v/moker)](https://www.npmjs.com/package/moker)

**No more struggles setting up new JavaScript repository. Kick-start
single-purpose repos, monorepos, monorepo workspaces and common tooling:**

```bash
# initialize a monorepo
yarn dlx moker create --monorepo my-repo
cd my-repo

# install common tools
yarn moker use prettier husky lint-staged doctoc semantic-release

# create workspaces
yarn moker add --template express server
yarn moker add --template cra client
```

## Features

- 👢 Kick-start a new repo or monorepo using Yarn
- 🧰 Plugins to use pre-configured common tooling
- ➕ Quickly add workspaces to a monorepo
- 🧬 Workspace templates for a shared library, React app, API or CLI
- ⚡ Extensible, bring your own plugins

> 🤓 The core plugins make some assumptions you may not agree with. If that's
> the case, this tool is probably not for you. The defaults used are documented
> below and marked with a nerd-face emoji so you should be able to get a clear
> picture of what to expect.

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Create monorepo](#create-monorepo)
  - [Use plugins](#use-plugins)
  - [Add workspace](#add-workspace)
- [Available plugins](#available-plugins)
  - [`dependabot` _monorepo_](#dependabot-_monorepo_)
  - [`devcontainer` _monorepo_](#devcontainer-_monorepo_)
  - [`doctoc` _monorepo_](#doctoc-_monorepo_)
  - [`github-actions` _monorepo_](#github-actions-_monorepo_)
  - [`husky` _monorepo_](#husky-_monorepo_)
  - [`jest` _workspace_](#jest-_workspace_)
  - [`lint-staged` _monorepo_](#lint-staged-_monorepo_)
  - [`prettier` _monorepo_](#prettier-_monorepo_)
  - [`semantic-release` _monorepo_](#semantic-release-_monorepo_)
  - [`todos` _workspace_](#todos-_workspace_)
  - [`typescript` _workspace_](#typescript-_workspace_)
- [Available templates](#available-templates)
  - [`bandersnatch` _workspace_](#bandersnatch-_workspace_)
  - [`common` _monorepo_](#common-_monorepo_)
  - [`cra` _workspace_](#cra-_workspace_)
  - [`express` _workspace_](#express-_workspace_)
  - [`lib` _workspace_](#lib-_workspace_)
- [Contributing](#contributing)
  - [Roadmap](#roadmap)
  - [Development](#development)
  - [Devcontainer](#devcontainer)
  - [Credits](#credits)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Getting started

## Prerequisites

You will need Node v14+ and Yarn v2+ in order to use `moker`.

- Install Node with [nvm](https://github.com/nvm-sh/nvm#install--update-script)
  or using [nodesource](https://github.com/nodesource/distributions#debinstall).
- Install Yarn using these simple steps:
  ```bash
  corepack enable
  corepack prepare yarn@stable --activate
  ```

## Create monorepo

Create a new monorepo:

```bash
yarn dlx moker create --monorepo my-repo
```

This will initialize a new monorepo in the `my-repo` directory.

> ⚠️ Note that we use `yarn dlx moker` to create a new monorepo. Once we are
> inside our monorepo, we can simply use `yarn moker` to execute commands.

> 🤓 The monorepo is initiated with Yarn without Zero-Installs and in legacy
> `nodeLinker: node-modules` mode because a lot of packages are not yet
> compatible with PnP or require a workaround.

## Use plugins

Of course you want additional tools installed at the monorepo level, add them
with:

```bash
cd my-repo
yarn moker use prettier husky lint-staged
```

Plugins may work together. For example, `lint-staged` will install a pre-commit
hook which formats code if `prettier` and `husky` are installed. The order in
which plugins are added does not matter.

See the section [available plugins](#available-plugins) for a list of options.

> 💡 To quickly get started with the most common plugins, use a monorepo
> template like so:
>
> ```bash
> yarn dlx moker create --template common my-repo
> ```

## Add workspace

To add a new workspace (a.k.a. monorepo package) to your monorepo, use:

```bash
yarn moker add my-workspace
```

Workspaces are added in a customizable subdirectory of the monorepo (the default
is `packages`).

You can also use a workspace template, e.g.:

```bash
yarn moker add --template lib shared
yarn moker add --template express server
yarn moker add --template cra client
yarn moker add --template bandersnatch cli
```

See the section [available templates](#available-templates) for a list of
options.

# Available plugins

## `dependabot` _monorepo_

This plugin adds a [Dependabot] configuration to your monorepo with an updater
for NPM packages.

If you have the `github-actions` plugin installed, it will add an updater for
GitHub Actions workflows.

[dependabot]:
  https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates

## `devcontainer` _monorepo_

This plugin creates a [Development Containers](https://containers.dev)
configuration using the
[`typescript-node`](https://hub.docker.com/_/microsoft-vscode-devcontainers)
image.

If you have the `prettier` plugin installed, it will add the
[Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

## `doctoc` _monorepo_

This plugin adds a script to generate a table of contents for the README using
[doctoc](https://github.com/thlorenz/doctoc).

If you have the `husky` plugin installed, it will also add a pre-commit hook.

## `github-actions` _monorepo_

This plugin creates a simple `ci.yml`
[GitHub Actions](https://github.com/features/actions) workflow.

If you have the `prettier` plugin installed, this will also setup a `lint.yml`
workflow.

If you have the `semantic-release` plugin installed, this will also setup a
`release.yml` workflow. This workflow needs these secrets to be added to your
repository:

- `GH_TOKEN`: a GitHub token with read/write access to your repository
- `NPM_TOKEN`: an NPM token with publish access to your packages

> 🤓 The workflows will use the `main` branch by default, but it is trivial to
> change this.

## `husky` _monorepo_

This plugin sets up [Husky](https://typicode.github.io/husky/#/) at the monorepo
level.

## `jest` _workspace_

This plugin sets up [Jest](https://jestjs.io) and adds a `test` and `test:watch`
script to both the workspace and the monorepo.

## `lint-staged` _monorepo_

This plugin sets up [lint-staged](https://github.com/okonet/lint-staged) at the
monorepo level.

If you have the `prettier` plugin installed, this will setup a task to format
staged files using `prettier --write --ignore-unknown`.

If you have the `husky` plugin installed, this will setup a pre-commit hook to
run `yarn lint-staged`.

## `prettier` _monorepo_

This plugin sets up [Prettier](https://prettier.io).

> 🤓 Prettier is installed with this configuration:
>
> ```yaml
> proseWrap: always
> ```
>
> We only set this `proseWrap` override because we think markdown files should
> always be truncated to match whatever the `printWidth` setting is. This makes
> it so much easier to read and write markdown files!

## `semantic-release` _monorepo_

⚠️ **This is work in progress**

_Current plan:_

- Move to `yarn npm publish`
- Set `"private": true` in root package
- This will cause semantic-release/npm to skip publish step
- We add exec plugin and use yarn workspaces foreach npm publish
- We can remove .npmrc file
- We need to modify .yarnrc.yml / .releaserc.json
- We can get rid of `"publishConfig"` in workspaces pkg
- [x] We need to change `prepublishOnly` to `prepublish`
- Document weird command (esp. JSON string echo)
- npm whoami fix not needed!

_This may be outdated:_

This plugin sets up
[semantic-release](https://semantic-release.gitbook.io/semantic-release/). It
uses a workaround so that it can be used in a monorepo, which is to set up a
`.npmrc` file containing:

```ini
workspaces = true
workspaces-update = false
```

This causes both `npm version` and `npm publish` to be run for each monorepo in
the `semantic-release` context.

Please note that the root repository is not published. Furthermore, make sure
that the root `package.json` doesn't contain:

```json
"private": true
```

Otherwise, the `semantic-release` process will skip the `publish` step.

> 🤓 The release configuration will use the `main` branch by default, but it is
> trivial to change this.

> ⚠️ The semantic-release plugin in our monorepo configuration is currently
> broken due to an issue with their npm plugin (see [semantic-release/npm#529])
> [this issue with their npm a]. Take a look at [patch-semantic-commit.js] in
> this repository for a workaround.

[semantic-release/npm#529]: https://github.com/semantic-release/npm/pull/529
[patch-semantic-commit.js]:
  https://github.com/hongaar/moker/blob/main/scripts/patch-semantic-commit.js

## `todos` _workspace_

This plugin adds a script to generate a TODO markdown file from all code
annotations using [leasot](https://github.com/pgilad/leasot).

If you have the `husky` plugin installed, it will also add a pre-commit hook.

## `typescript` _workspace_

This plugin sets up [TypeScript](https://www.typescriptlang.org) and adds a
`build` and `build:watch` script to both the workspace and the monorepo.

# Available templates

## `bandersnatch` _workspace_

Scaffolds a simple [bandersnatch](https://github.com/hongaar/bandersnatch) CLI
app tool with the [typescript](#typescript-workspace) and
[jest](#jest-workspace) plugins.

## `common` _monorepo_

This is the only monorepo template at this point. It simply installs all
available monorepo plugins.

## `cra` _workspace_

Uses [create-react-app](https://create-react-app.dev/) to scaffold a React.js
app (web client).

## `express` _workspace_

Scaffolds a simple [express](https://expressjs.com) HTTP app with the
[typescript](#typescript-workspace) and [jest](#jest-workspace) plugins.

## `lib` _workspace_

A plain shared library template with the [typescript](#typescript-workspace) and
[jest](#jest-workspace) plugins.

# Contributing

Contributions are very welcome!

## Roadmap

- [ ] Adapt for non-monorepo use-cases (WIP)
- [ ] Add LICENSE file to monorepo
- [ ] Support for `swc`/`esbuild`
- [ ] A compat lib (which builds cjs and mjs targets)
- [ ] Blog post / tutorial
- [ ] Docs for writing custom plugins / templates
- [x] github-actions plugin
- [x] devcontainer plugin
- [x] leasot (todos) plugin
- [x] doctoc plugin
- [x] semantic-release plugin
- [x] Port templates
- [x] Support for BYO plugins/templates
- [x] Remove plugins

Also see [TODO.md](TODO.md).

## Development

To run the `moker` CLI from source, run:

```bash
yarn start
```

Note that you can create a new monorepo for testing purposes outside the current
working directory with:

```bash
yarn start create /path/to/my-repo
```

## Devcontainer

A devcontainer configuration is included in this repo to
[get started quickly](https://code.visualstudio.com/docs/remote/containers#_quick-start-open-an-existing-folder-in-a-container).

## Credits

©️ Copyright 2022 [Joram van den Boezem](https://joram.dev)  
♻️ Licensed under the [MIT license](LICENSE)  
🤔 Moker? **MOnorepo KickstartER**
