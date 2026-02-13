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

# And, assuming you have a Ruby installation managed by mise...
./bin/bundle install
```

### Formatting and linting

Once you've made changes, you can:

- Ensure `prettier` formatting is applied with `npm run format`
- Use `eslint` with `npm run lint`

### Tests
#### Component Tests (jest)

`jest` tests can be run with:

``` bash
npm run test
```

If you're using VSCode and would like to use an interactive debugger with `jest`,
bring up the command pallate (`cmd shift p`), and run
"Debug: JavaScript Debug Terminal", then:

``` bash
npm run test
```

#### Integration Tests (capybara)

Assuming you've gotten the `ruby` dependencies with `./bin/bundle install`,
these tests can be run with:

``` bash
./bin/bundle exec rspec
```

Or, if you'd like to hook into the test suite with the Ruby debugger,
`rdbg`, run:

``` bash
./bin/bundle exec rdbg -- ./bin/bundle exec rspec
```

If you're not familiar with the ruby debugger, there's some decent
documentation on the upstream [GitHub page][rdbg].

### Technologies

This project uses:

- [`eslint`][eslint] for JavaScript code quality enforcement.
- [`jest`][jest] for unit testing.
- [`prettier`][prettier] for JavaScript formatting.
- [`web-ext`][web-ext] for extension testing
- [`ruby-capybara`][capybara] for testing.
- [`mise`][mise] for managing local installations of Ruby.
- [`rdbg`][rdbg] for debugging Ruby/Capybara.

<!-- Links -->

[node]: https://nodejs.org/en/download
[web-ext]: https://github.com/mozilla/web-ext
[prettier]: https://prettier.io/
[jest]: https://jestjs.io/docs/getting-started
[eslint]: https://eslint.org/
[capybara]: https://github.com/teamcapybara/capybara/tree/master
[mise]: https://mise.jdx.dev/lang/ruby.html
[rdbg]: https://github.com/ruby/debug?tab=readme-ov-file#how-to-use
