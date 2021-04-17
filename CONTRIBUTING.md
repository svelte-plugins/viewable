# CONTRIBUTING

Contributions are always welcome, no matter how big or small the contribution. Before contributing, please read the [Code of Conduct](COC.md).

## TLDR;

```js
> yarn
> yarn dev
```

In another terminal window:

```
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

I welcome your pull requests.

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed the API, update the documentation in the [README](README).
4. Ensure the test suite passes.

## License

By contributing to this repository, you agree that your contributions will be licensed
under its [MIT](LICENSE) license.
