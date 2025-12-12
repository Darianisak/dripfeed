# dripfeed

`dripfeed` is a Firefox browser extension which manipulates DOM elements of
social media websites, helping stem the tide of content that we're exposed to.

## Development

### Getting Setup

To get started with dripfeed extending or enhancing dripfeed, you'll need
to set your environment up.

Assuming you have [`nodejs`][node] installed, this can be done like so:

```bash
git clone git@github.com:Darianisak/dripfeed.git
cd dripfeed
npm ci
```

Once you've made changes, you can:

- Ensure `prettier` formatting is applied with `npm run format`
- Run `jest` tests with `npm run test`
- Use `eslint` with `npm run lint`

### Technologies

This project uses

- [`eslint`][eslint] for JavaScript code quality enforcement.
- [`jest`][jest] for unit testing.
- [`prettier`][prettier] for JavaScript formatting.
- [`web-ext`][web-ext] for extension testing

<!-- Links -->

[node]: https://nodejs.org/en/download
[web-ext]: https://github.com/mozilla/web-ext
[prettier]: https://prettier.io/
[jest]: https://jestjs.io/docs/getting-started
[eslint]: https://eslint.org/
