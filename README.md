# dripfeed

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![Mozilla Add-on](https://img.shields.io/amo/v/dripfeed)](https://addons.mozilla.org/en-US/firefox/addon/dripfeed/)

![Combined Reddit Slice](./docs/images/combined_slice.png)

_Screenshots combined with Gemini Flash; July 2026_

## Table of Contents

| Section                                       | Subsections                                                                                                       |
| :-------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **[About](#about)**                           | [How does it work?](#how-does-it-work)                                                                            |
| **[Development](#development)**               | [Setting up your Environment](#setting-up-your-environment) <br> [Code Style](#code-style) <br> [Mobile](#mobile) |
| **[Testing](#testing)**                       | [Unit testing](#unit-testing) <br> [End-to-end testing](#end-to-end-testing)                                      |
| **[Dependency Updates](#dependency-updates)** |                                                                                                                   |
| **[Releasing](#releasing)**                   |                                                                                                                   |

---

## About

_dripfeed_ is a browser extension which modifies social media websites,
with the aim of making them less addictive.

It is available for [**Firefox** and **Firefox for Android**][amo].

We aim to support other platforms in the future.

### How does it work?

_dripfeed_ works by selectively removing parts from certain social media
websites, making it easier to get 'just' the information that you're after.

Our belief is that social media websites _are_ useful tools, which prevents
people from blocking them outright. _dripfeed_ is a way to take back some control.

For Reddit, this looks like removing:

- _All_ content from the Homepage, to prevent doom scrolling.
- _Some_ content from posts and subreddits, supporting focus.

## Development

_dripfeed_ is an MPL-2.0 project - anyone is welcome to contribute!

### Setting up your Environment

While the extension itself is written in **JavaScript** and **TypeScript**,
you'll need a few other languages and tools, such as **Ruby** and **Python**,
to work on the project.

**Please note, this set up document was written with MacOSX in mind.**

### Quick Start

If you already have `nodejs`, `python`, and `ruby` (via `mise`) installed,
you can bootstrap the entire environment with:

```bash
# Install JavaScript/TypeScript dependencies
npm ci

# Set up and install Python dependencies
python3 -m venv pydeps
source pydeps/bin/activate
pip3 install -r requirements.txt

# Install Ruby dependencies
./bin/bundle install
```

Otherwise, read-on for the detailed set up instructions.

#### Core dependencies

Before setting up the project's specific requirements, ensure you have all of
the core dependencies installed and setup:

- [`nodejs`][node]
- [`python`][venv]
- `ruby`, managed with [`mise`][mise]

#### JavaScript/TypeScript Setup

This project uses `npm` to manage third party libraries. These can be
installed with:

```bash
npm ci
```

These libraries are mainly for testing.

#### Python Setup

Python is used for formatting, and can be set up with:

```bash
python3 -m venv pydeps
source pydeps/bin/activate

pip3 install --requirement requirements.txt
```

#### Ruby Setup

This project uses Ruby, and more specifically, the [Sinatra][sinatra] framework,
as a backend for running end-to-end tests.

This project assumes that Ruby will be managed via [`mise`][mise].

The project's Ruby dependencies can then be installed with:

```bash
./bin/bundle install
```

### Code Style

This project uses a variety of formatters and linters to maintain
style consistency:

- [`prettier`][prettier] for JavaScript, TypeScript, and Markdown formatting. (`npm run format`)
- [`eslint`][eslint] for JavaScript and TypeScript linting. (`npm run lint`)
- [`yamllint`][yamllint] for formatting and linting our CI/CD specs. (`npm run yaml`)
- [`rubocop`][rubocop] for formatting and linting our Ruby code. (`npm run rubocop`)
- [`semgrep`][semgrep] for basic security scans. (`npm run semgrep`)

You can trigger all of these with:

```bash
npm run style
```

These linters and formatters are enforced by CI/CD.

### Mobile

As this extension ships to mobile, it's important that we test it
during development.

Mozilla provides some good documentation for getting set up [here][moz-mob].

The main tool we need is `adb`.

With the dependencies installed per Mozilla's docs, we can build and deploy
our extension to a debugging enabled mobile device.

#### Android

```bash
# Find the device ID of the debugging device
adb devices

# Build the extension's JavaScript bundles
npm run build

# Distribute it to the Mobile device
npx web-ext run --source-dir ./extension/ -t firefox-android --android-device=<ADB_DEBUGGING_DEVICE_ID>
```

#### iOS

_iOS is not currently supported._

## Testing

_dripfeed_ is maintained by one person, so manual testing isn't feasible.

To that end, automated testing is crucial.

By keeping our test suite healthy, we can more easily remediate bugs and
implement new features.

### Unit testing

We use the [`jest`][jest] framework for our unit tests.

Unit tests can be run with:

```bash
npm run test:unit
```

#### Debugging

This project is maintained using Codium/VSCode, so our debugging recommendation
is to use the integrated _JavaScript Debug Terminal_.

Read more about it [here][js-debug].

### End-to-end testing

We use [`rspec`][rspec] running against a [`sinatra`][sinatra] webserver to
provide our end-to-end tests.

End-to-end tests can be run with:

```bash
npm run test:e2e
```

The `sinatra` webserver can also be run stand-alone, allowing you to interact
with the HTML Mocks that your tests will use:

```bash
npm run sinatra
```

#### Debugging

This project uses [`ruby/debug`][ruby-debug] for debugging the end-to-end tests.

Assuming you've popped a `debugger` statement in a test spec, this debugger
can be called with:

```bash
npm run debug:e2e
```

Or, if you want to debug the [`sinatra`][sinatra] webserver rather than a
test spec, run:

```bash
npm run debug:sinatra
```

Read more about `ruby/debug` [here][ruby-debug].

#### Philosophy

By its nature, _dripfeed_ is an extension that modifies remote websites that
_we do not control_.

This lack of control makes it hard to have meaningful end-to-end tests.

While by no means perfect, we've found some success by reproducing these
remote websites locally, by:

- Taking snapshots of their HTML (HTML Mocks).
- Serving this HTML from a local web server.
- Writing tests against this local version.

This also plays nicely with CI/CD, as it removes the need for any remote
dependencies.

There are drawbacks too:

- There is significant overhead to testing new pages or sites.
- The HTML Mocks can easily go out of date.
- Updating Mocks is a tedious and manual process.

Some of these drawbacks will be alleviated over time.

Why did we do it this way?

- It allows us to easily load the extension into a headless, non-privileged browser.
- Traditional mocking libraries, like `web-mock`, would be cumbersome.

#### Implementation

The end-to-end tests are:

- Written in `ruby`.
- Use the [`rspec`][rspec] test framework.
- Leverage the [`capybara`][capybara] `rspec` extension.
- Run against a local [`sinatra`][sinatra] webserver.

A good place to start when writing new tests is:

- The pre-existing Reddit home page spec: `tests/e2e/reddit/signed_in/homepage_spec.rb`
- The Reddit helper specs: `tests/e2e/reddit/helpers.rb`

If adding a new page or HTML Mock, you'll need to:

- Download the HTML of the new page.
- Change the file type from HTML to `.erb`
- Move the file under `views/`. For example, a new Reddit mock would go under: `views/reddit/signed_out/new_mock.erb`
- Add a JavaScript module import tag to the Mock file; i.e., a Reddit Mock would get: `<script type="module" src="/reddit/index.js"></script>`
- Update the routing `sinatra` uses in `sinatra.rb` so the new Mock can be served.

Once in-place, it's a good idea to check that the Mock is being served correctly
by running the `sinatra` webserver in standalone mode:

```bash
npm run sinatra

open http://localhost:4567/<mock_route_name>
```

## Dependency Updates

There are a number of dependencies used by this project that need
semi-frequent updates.

The safe updates can be done by running:

```bash
npm run update:all

npm run style

npm run test:unit
npm run test:e2e

git add .
git commit -m "chore: updates safe dependencies"
```

If you'd prefer to update dependencies per ecosystem instead, this can be
done with:

- `npm run update:python`
- `npm run update:ruby`
- `npm run update:js`

Please note that, in the case of JavaScript/TypeScript dependencies, only
'safe' updates will be made by default. Major version changes will still
require oversight.

## Releasing

At the time of writing, _dripfeed_ is manually released to the Mozilla Addon-on
Marketplace (AMO).

Building the assets for release can be done like so:

```bash
npm run build
```

This will create two output files under `./build`:

- `dripfeed-<VERSION_NUMBER>.zip` - This is the extension that will be published.
- `source.tar.gz` - This is the source code, which Mozilla requires for review.

Be sure to increment the version number in `package.json`!

<!-- Links -->

[node]: https://nodejs.org/en/download
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
[semgrep]: https://github.com/semgrep/semgrep
[amo]: https://addons.mozilla.org/en-US/firefox/addon/dripfeed/
[moz-mob]: https://extensionworkshop.com/documentation/develop/developing-extensions-for-firefox-for-android/
[js-debug]: https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_javascript-debug-terminal
[ruby-debug]: https://github.com/ruby/debug
