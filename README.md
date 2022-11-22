# mokr

> **This project is work in progress**

> 👢 Kick-start monorepos

[![npm (scoped)](https://img.shields.io/npm/v/@mokr/cli?label=%40mokr%2Fcli&logo=npm&style=flat-square)](https://www.npmjs.com/package/@mokr/cli)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/hongaar/mokr?logo=code%20climate&style=flat-square)](https://codeclimate.com/github/hongaar/mokr)

## Features

- ✨ Scaffold a monorepo with ease
- 🧰 Monorepo plugins to use pre-configured common tooling
- ➕ Add workspaces on demand
- 🧬 Workspace templates for a library, React app, API or CLI
- ⚡ Extensible, bring your own plugins

## Why?

This project aims to concentrate the struggle of setting up monorepo tooling in
one opiniated tool, so you can scaffold monorepos and workspaces (a.k.a.
monorepo packages) fast.

## Opiniated

The core plugins make some assumptions you may not agree with. If that's the
case, this tool is probably not for you. The defaults used are documented below
and marked with a nerd-face emoji 🤓 so you should be able to get a clear
picture of what to expect.

## Prerequisites

You will need Node v14+ and Yarn v3+ in order to use `mokr`.

- Install Node with [nvm](https://github.com/nvm-sh/nvm#install--update-script)
  or using [nodesource](https://github.com/nodesource/distributions#debinstall).
- Install Yarn using these simple steps:
  ```bash
  corepack enable
  corepack prepare yarn@stable --activate
  ```

# Quickstart

Create a new monorepo:

```bash
yarn dlx @mokr/cli create my-repo
```

> ⚠️ Note that we use `yarn dlx @mokr/cli` to create a new monorepo. Once we are
> inside our monorepo, we can simply use `yarn mokr` to execute commands.

> 🤓 The monorepo is initiated with Yarn without Zero-Installs and in legacy
> `nodeLinker: node-modules` mode because a lot of packages are not yet
> compatible with PnP or require a workaround.

Of course you want additional tools installed at the monorepo level, add them
with:

```bash
cd my-repo
yarn mokr use prettier husky lint-staged
```

Plugins may work together. For example, `lint-staged` will install a pre-commit
hook which formats code if `prettier` and `husky` are installed. The order in
which plugins are added does not matter.

See the section [core plugins](#core-plugins) for a list of available options.

> 💡 To quickly get started with the most common plugins, use a monorepo
> template like so:
>
> ```bash
> yarn dlx @mokr/cli create --template common my-repo
> ```

````

### Templates

### Workspaces

Add a new workspace:

```bash
yarn mokr add my-workspace
````

Or use a workspace template (see below for more options):

```bash
yarn mokr add my-lib --template lib
```

## Templates

### `lib`

This is the default template (i.e. used when no template is specified). Your
package will be scaffolded with `typescript`.

### `cra`

Uses [create-react-app](https://create-react-app.dev/) to scaffold a React.js
app (web client)

### `adonis`

Uses
[create-adonis-ts-app](https://github.com/AdonisCommunity/create-adonis-ts-app)
to scaffold an Adonis app (API server)

### `bandersnatch`

Uses [bandersnatch](https://github.com/hongaar/bandersnatch) to scaffold a CLI
tool

## Core workspace templates

### `lib`

This is the default template (i.e. used when no template is specified). Your
package will be scaffolded with `typescript`.

### `cra`

Uses [create-react-app](https://create-react-app.dev/) to scaffold a React.js
app (web client)

### `adonis`

Uses
[create-adonis-ts-app](https://github.com/AdonisCommunity/create-adonis-ts-app)
to scaffold an Adonis app (API server)

### `bandersnatch`

Uses [bandersnatch](https://github.com/hongaar/bandersnatch) to scaffold a CLI
tool

## Core plugins

### `prettier`

This plugin sets up [Prettier](https://prettier.io) at the monorepo level.

> 🤓 Prettier is installed with this configuration:
>
> ```yaml
> proseWrap: always
> ```
>
> We only set this `proseWrap` override because we think markdown files should
> always be truncated to match whatever the `printWidth` setting is. Not having
> to do this manually makes writing markdown files so much easier!

### `jest`

This plugin sets up [Jest](https://jestjs.io) at the workspace level.

### `github-actions`

This plugin sets up [GitHub Actions](https://github.com/features/actions) at the
monorepo level.

### `devcontainer`

This plugin sets up [devcontainer](https://containers.dev) configuration at the
monorepo level.

### `husky`

This plugin sets up [Husky](https://typicode.github.io/husky/#/) at the monorepo
level.

### `lint-staged`

This plugin sets up [lint-staged](https://github.com/okonet/lint-staged) at the
monorepo level.

If you have the `prettier` plugin installed, this will setup a task to format
staged files using `prettier --write --ignore-unknown`.

If you have the `husky` plugin installed, this will setup a pre-commit hook to
run `yarn lint-staged`.

## Roadmap

- [ ] Port templates
- [ ] Add more plugins
- [ ] Support for `swc`/`esbuild`
- [ ] A compat lib (which builds cjs and mjs targets)
- [ ] Blog post / tutorial
- [ ] Docs for writing custom plugins / templates
- [x] Support for BYO plugins/templates
- [x] Remove plugins

## Contributing

Contributions are very welcome!

### Development

To run the `mokr` CLI from source, run:

```bash
yarn start
```

Note that you can create a new monorepo for testing purposes outside the current
working directory with:

```bash
yarn start create /path/to/my-repo
```

## What's with the name?

MonorepO KickstarteR
