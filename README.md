# Talk to Frank Beta

## Dependencies

- nodejs version `10.13.0`

## Building

To build files to `./dist`:

`grunt build`

### Environment Vars

The `BUILD_CONFIG=staging|production|development` (defaults to `development`) environment variable should be used to define to the application the environment it is running in. This is separate to `NODE_ENV` since many libraries (React included) rely on the de-facto standard values of `production|development` to optimise their running.

Setting `BUILD_CONFIG` sets `NODE_ENV` automatically accordingly in webpack.js.

### Live configuration

No passwords / keys etc. are kept in the repo. Conmfiguration files (`config.<ENV>.yaml`)
need additional configuration that is read in at runtime.

As such, a number of `config.*.yaml` files are required in the root of the project to store keys etc.

The following files are required:

- `config.creds.yaml`
- `config.ethereal.yaml`
- `config.google.yaml`
- `config.mailgun.yaml`
- `config.sentry.yaml`
- `config.webhooksecretkey.yaml`

## Development

A feature branch branching strategy is in use, specifically:

- When a new feature is to be added, a developer should branch from `develop` naming the new branch `feature/[userstory-id]-[short description of new feature for humans]`
- When the work is ready (tested, linted etc.), a pull request should be opened against the `develop` branch.
- A peer review should be undertaken against the pull request and the branch merged.
- The CI server will build from the develop and deploy to the staging server.

### Grunt tasks

| Task | Description                                                                      |
| --------------- | -------------------------------------------------------------------------------- |
| `grunt`  (default)                    | Clean existing & build new bundled files. Run your app on the development server at `localhost:3000`.  |
| `grunt build `                        | Create new bundled files                                                      |
| `grunt ngrok`                         | Setup an grok tunnel to your local web server                                 |
| `grunt contentful`                    | Pull all entries from contentful & reindex in Elasticsearch                   |
| `grunt localtunnel or grunt ngrok`    | Run local server (monitor for changes) with ngrok tunnel                      |


### Contenftul CLI

Migration and API query tools available using [contentful-cli](https://github.com/contentful/contentful-cli).


| `contentful <script>` | Description                                                                      |
| --------------- | -------------------------------------------------------------------------------- |
| `login / logout`           | Start/end a CLI tool session |
| `content-type list --space-id xxx` | List all content types |
| `content-type get --space-id xxx --id [content type id]`| Get a list of content type fields |


### Workbox (service worker)

**Note: service workers require an HTTPS connection**

[Workbox](https://developers.google.com/web/tools/workbox/modules/) is used to handle service-worker logic.  Configuration is
found in ```/workbox-config.js```

* service worker is found in ```app/client```
* all requests for png, ico, css and png files are routed via the service worker using a **'Network first'** policy:
  * requests made while online will always go to the server first
  * offline requests will correctly load the cached files so that offline.html can be loaded correctly
* the page at '/offline' is precached when a user first visits the site.  This page is then served to users when they go offline via the service worker.
* when updating the offline page, the service worker cached version can be invalidated by updating the corresponding 'revision' value in the workbox.precaching.precacheAndRoute options within service-worker.js


### Emails

[ethereal.email](https://ethereal.email/) is used for testing emails.

To use the Mailgun testing sandbox, you first need to add your email address
to this page (which isn't shown on the dashboard):
https://app.mailgun.com/app/account/authorized

### Elasticsearch

AWS Elasticsearch is used to provide the search capability, access is restricted using AWS IAM accounts:

- The Alpha server has been given the IAM Role 'TalkToFrank-EC2-ElasticSearch' and therefore credentials are auto loaded
- For development add the following to your config file, requesting the access key id/secrets where required.

```
elasticsearch:
  host: ''
  amazonES:
    credentials:
      accessKeyId: ''
      secretAccessKey: ''
    region: ''
```

### Sentry logging

Server side logging via [Sentry](http://sentry.io) can be enabled using the following configuration:

```
sentry:
 logErrors: true
 dsn: ''
```

### Testing

Smoke tests available using cucumber-js and puppeteer.  Folder structure for the tests:

```
.
└── features                        # Folder containing all cucumber feature files
    ├── debug                       # Debugging console output and screenshots saved here
    ├── step_definition             #
    │   ├── common.js               # Cucumber give/then/when step defintions
    ├── support                     # Helper files
    │   ├── actions.js              # Implementations of step definitions using puppeteer API
    │   ├── assertions.js           # Text found on the site used to assert scenarios
    │   ├── pages.js                # URLs used as part of the scenariuos
    │   ├── scope.js                # initialises a global scope used to store access to the browser
    │   └── selectors.js            # DOM selectors found on the site used to assert scenarios
    ├── hooks.js                    # Before/After cucumber hooks
    └── world.js                    # Global cucmber js config
```

#### Tags used

* `@wip` - work in progress, to be implemented
* `@duplicate` - should be ignored / are not implemented as the functionality is duplicated into another scenario
* `@ignore` - any other tests that should not be run (aren't going to be implemented and are not duplicates)

#### Running the test

To run the cucumber-js test the site must already be running, i.e. this command does not start the server.
You can either run the tests via the CLI:

```
CUCUMBER_HOST=[http://testdomain] cucumber-js --tags "not @ignore and not @wip and not @duplicate"
```

Or using Grunt, which assumes the config found in `./grunt/cucumberjs`:

```
CUCUMBER_HOST=[http://testdomain] grunt cucumberjs
```

This will create an HTML formatted results page at `./features/report.html`



## Releasing

- Determine the new semantic version of the release.
- if updating the offline page content, change the 'revision' number in `app/client/service-worker.js` to invalidate existing caches
- Update `package.json`.
- Ensure `changelog` is up to date, whereby changes for the release are listed underneath the version.
- Merge `develop` into `master`.
- Manually run the CI server so that the master is deployed to production.
- Create a new `release/vX.Y.Z` where the release number relates to the semantic version of the release.

## CI

BuddyCI is used for the CI server (see `buddy.yaml`).

- The `Build` CI task validates all branches
- The `Build & Deploy` task runs whenever an update to `develop` is made. This task will update the staging server.

### SSH / Keys

To give BuddyCI access to the integration server, the public key (found at `/environment-variables`) should be added to the `deploy` user's `~/.ssh/authorized_keys` file on the staging server.
