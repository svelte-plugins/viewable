# CONTRIBUTING

Contributions are always welcome, no matter how big or small the contribution. Before contributing, please read the [Code of Conduct](COC.md).

## TLDR;

```sh
> yarn
> yarn dev
```

In another terminal window:

```sh
> yarn --cwd ./docs && yarn --cwd ./docs dev
```

## Getting Started

1. Fork this repo to your personal GitHub account.

1. Clone your personal fork

   ```sh
   > git clone git@github.com:<username>/viewable.git
   ```

1. Add upstream as a remote

   ```sh
   > git remote add upstream git@github.com:svelte-plugins/viewable.git
   ```


1. Install dependencies and watch for changes in source
   
   If you do not have yarn installed, run `npm i -g yarn`

   ```sh
   > yarn && yarn dev
   ```

1. Install dependencies and start the `docs` server

   ```sh
   > yarn --cwd ./docs && yarn --cwd ./docs dev
   ```

1. Open the following url http://localhost:3000. That's it!
   
## Pull Requests

1. Fork the repo and create your branch from `main`.
1. If you've added code that should be tested, add tests.
1. If you've changed the API, update the [README](README) with your changes.
1. Follow the instructions in the PR template

## Commit Messages

Please make sure your commits follow semantic commit messaging.

Format: `<type>(<scope>): <subject>`

`<scope>` is optional

### Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

### Types

- `chore`: Updating packages, gulp tasks, etc; no production code change.
- `docs`: Changes to the documentation.
- `feat`: New feature for the user, not a new feature for build script.
- `fix`: Bug fix for the user, not a fix to a build script.
- `refactor`: Refactoring production code, eg. renaming a variable.
- `style`: Formatting, missing semi colons, etc; no production code change.
- `test`: Adding missing tests, refactoring tests; no production code change.

### Usage

- chore: add Oyster build script
- docs: explain hat wobble
- feat: add beta sequence
- fix: remove broken confirmation message
- refactor: share logic between 4d3d3d3 and flarhgunnstow
- style: convert tabs to spaces
- test: ensure Tayne retains clothing

## License

By contributing to this repository, you agree that your contributions will be licensed
under its [MIT](LICENSE) license.
