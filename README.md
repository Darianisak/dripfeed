# dripfeed

`dripfeed` is a browser extension which manipulates DOM elements of social
media websites, helping stem the tide of content that we're exposed to.

## Development

### Getting Setup

To get started with dripfeed extending or enhancing dripfeed, you'll need to set your environment up.

Assuming you have [`nodejs`][node] installed, this can be done like so:

```bash
git clone git@github.com:Darianisak/dripfeed.git
cd dripfeed
npm ci
```

Then, to ensure you're able to run all the formatting tools, you'll need a
[Python Virtual Environment][venv]:

```bash
python3 -m venv pydeps
source pydeps/bin/activate

pip3 install --requirement requirements.txt
```

And finally, to ensure that you can run the full test suite, you'll need to
install our Ruby dependencies:

<details>
<summary>But what if Ruby isn't installed?</summary>

This project assumes that Ruby will be installed and managed via `mise`.

Check out the installation docs, [here][mise].

</details>

```bash
./bin/bundle install

```

### Formatting and linting

Once you've made changes, you can:

- Ensure `prettier` formatting is applied with `npm run format`.
- Use `eslint` with `npm run lint`.
- Use `yamllint` with `npm run yaml`.
- Use `rubocop` with `npm run rubocop` to format and lint Ruby test code.

### Testing

#### JavaScript

JavaScript unit tests can be run with:

```bash
npm run test
```

Tests are most easily debugged with VSCode's "JavaScript Debug Terminal".

#### Ruby

Ruby browser integration tests can be run with:

```bash
npm run rspec
```

Or, if you'd like to run these tests with a debugger directive, use:

```bash
./bin/bundle exec rdbg -- ./bin/bundle exec rspec
```

If you'd like to run the Sinatra server so that you can view your fixtures:

```bash
npm run sinatra
```

And then:

```bash
open http://localhost:4567/${ROUTE_NAME}
```

#### Creating New Site Mocks

If you'd like to create atomic removal tests for a new page or website:

- Head to the page.
- Download the pages HTML content. This could be done with `curl`, too.
- Save the content in a meaningful location within `view/`.
- Change the file extension from `.html` to `.erb`.
- Add a route in `sinatra.rb`.
- Add a script tag to the HTML document's `<head>` to load the desired JavaScript
  module. I.e., `<script type="module" src="/reddit/index.js"></script>`.

With the HTML fixture set up, go ahead and add new tests under `spec/features/*`.

### Building

The extension ZIP can be built with:

```bash
npm run build
```

### Updating

We can update the project's NPM and RubyGems dependencies by:

```bash
# Update JavaScript dependencies
npm audit fix

# Update Ruby dependencies
bundle update

# Stage the updates and commit
git add .
git commit -m "chore: updates safe dependencies"
```

These steps don't account for cases whereby we need to perform an unsafe major
version migration.

### Technologies

This project uses:

- [`eslint`][eslint] for JavaScript code quality enforcement.
- [`jest`][jest] for unit testing.
- [`prettier`][prettier] for JavaScript formatting.
- [`web-ext`][web-ext] for extension testing.
- [`yamllint`][yamllint] for YAML linting.
- [`mise`][mise] to manage Ruby installations.
- [`rubocop`][rubocop] to enforce Ruby best-practice.
- [`sinatra`][sinatra] for serving test fixtures.
- [`rspec`][rspec] and [`capybara`][capybara] for atomic integration tests.

<!-- Links -->

[node]: https://nodejs.org/en/download
[web-ext]: https://github.com/mozilla/web-ext
[prettier]: https://prettier.io/
[jest]: https://jestjs.io/docs/getting-started
[eslint]: https://eslint.org/
[yamllint]: https://yamllint.readthedocs.io/en/stable/configuration.html
[venv]: https://docs.python.org/3/library/venv.html
[mise]: https://mise.jdx.dev/getting-started.html
[rubocop]: https://rubocop.org/
[sinatra]: https://sinatrarb.com/
[rspec]: https://rspec.info/
[capybara]: https://github.com/teamcapybara/capybara?tab=readme-ov-file#capybara
