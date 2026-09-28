# acme-web

A small status-page service used to demonstrate [Mendr](https://www.mendr.sh).

> **Its dependencies are vulnerable on purpose.** They are pinned to releases
> from early 2021, so the repository has real, published advisories for Mendr
> to fix. Do not deploy this code.

## What it does

- `src/client.js` reads service health from a status API with **axios**.
- `src/args.js` parses command-line options with **minimist**.
- `src/icons.js` optimizes the SVG status icons with **svgo** at build time.

Each dependency has tests in `test/`, so a fix that breaks one of them fails CI.

```sh
npm ci
npm run build   # optimizes icons/ into dist/icons/
npm test        # node --test
npm start -- --base-url http://localhost:8080 --services api,web
```

## Mendr pull requests

Mendr scans this repository and opens pull requests that fix its advisories.
Each pull request says what changed, which commands ran in Mendr's sandbox,
what the independent AI review found, and what could not be checked. This
repository's GitHub Actions workflow then runs the build and the tests.
Read the [pull requests](../../pulls?q=is%3Apr+author%3Aapp%2Fmendr-app) to see
the results, including any fix that Mendr could not complete.
