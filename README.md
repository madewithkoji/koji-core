# Koji Core

![npm (scoped)](https://img.shields.io/npm/v/@withkoji/core?color=green&style=flat-square)
[![Discord](https://img.shields.io/discord/769256827007139912.svg?style=flat-square)](https://discord.gg/9egkTWf4ec)

**Core library for developing customizable Koji apps.**

## Overview

The @withkoji/core package enables you to implement core platform features in your Koji app, including customization, in-app purchases, UI controls, messaging, and identity services.

## Installation

Install the package in the frontend and backend services of your Koji project.

```
npm install @withkoji/core
```

## Basic use

The @withkoji/core package provides a set of modules that are specific to client and server behaviors.

### Frontend

Import the package in your frontend code.

```js
import Koji from '@withkoji/core';
```

Initialize the package with your configuration data.

```js
// Initialize
Koji.config(require('././koji.json'));

// render
render();
```

Indicate that the application is ready to start receiving events.

```js
Koji.ready();
```

Enable the user to upload an image from the frontend of the Koji app.

```js
import Koji from '@withkoji/core';

const captureImage = async () => {
  const imageURL = await Koji.ui.capture.image();

  console.log(imageURL); // The publicly accessible, CDN-backed path of the user's uploaded image
}
```

### Backend

Import the package in your backend code.

```js
import { KojiBackend } from '@withkoji/core';
```

Initialize the package with your configuration data, and use `KojiBackend.middleware` to scope operations for each customized version of the app.
Add routes for backend operations (for example, use a Koji database).

```js
import { KojiBackend } from '@withkoji/core';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

// Import our configuration
import kojiConfig from '../../koji.json';

// Init
const app = express();

// Enable cors for preflight
app.options('*', cors());

// Whitelist all routes with cors
app.use(cors());

// Use express json
app.use(express.json());

// Parse application/json
app.use(bodyParser.json());

// Use Koji's middleware to handle scoping across customized versions of the app
app.use(KojiBackend.middleware(kojiConfig));

// Disable caching
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

// Add routes here - for example:
app.get('/data', (req, res, next) => {
  const database = new KojiBackend.Database({ res });

  // Look up an item in the items collection
  const item = await database.get('items', 'myItemId');

  res.status(200).json({
    item,
  });
});

// Start server
app.listen(process.env.PORT || 3333, null, async (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log('[koji] backend started');
});
```

## Generating documentation locally

This package uses TypeDoc comments for documentation.
The latest version of the documentation is available online at the [Koji developer site](https://developer.withkoji.com/reference/core/withkoji-koji-core).
However, you can also generate the package documentation locally for offline reference.

- To generate an HTML version of the documentation, run `npm run doc` and open the resulting `docs` folder in your favorite HTML viewer or browser.

- To generate the underlying JSON content for the documentation, run `npm run json-doc`. This command will output a `koji-core-docs.json` file that you can use as a data source for your favorite parser or static site generator.

## Related resources

* [Package documentation](https://developer.withkoji.com/reference/core/withkoji-koji-core)
* [Tutorial: Koji quick start](https://developer.withkoji.com/docs/getting-started/start-tutorial)
* [Migrating to the Koji core package](https://developer.withkoji.com/docs/dev-guides/migrate-koji-core)
* [Koji homepage](http://withkoji.com/)

## Contributions and questions

See the [contributions page](https://developer.withkoji.com/docs/about/contribute-koji-developers) on the developer site for general info on how to make contributions to Koji repositories and developer documentation.

For any questions, reach out to the developer community or the `@Koji Team` on our [Discord server](https://discord.gg/9egkTWf4ec).

### Developing for the Koji Core package

If you would like to test or develop new features for the package, here are a few steps that will get you up and running quickly.

**Note:** These steps assume you're already using the `@withkoji/core` package, installed via npm.

1. Clone this repository to your local machine.
2. In the package's root folder, run `npm install` to install the required dev dependencies.
3. Start the build watcher by running `npm run watch` in the package's root folder.
4. (Optional) Start the declarations watcher by running `npm run watch-declarations` in the package's root folder.
5. In your consumer project, remove the existing installation: `npm remove @withkoji/core`.
6. In your consumer project, install the local package by referencing the folder where you cloned the repo. For example: `npm install ~/YourComputer/koji-core`.

 If everything went well, your consumer project should now be referencing your local installation.

**Notes:**

- If your consumer project offers hot reloading, you should see updates made to the package recompiled by the watcher and injected into your project automatically.

- If your consumer project does not offer hot reloading (for example, an Express app), you'll need to quit the process and restart to get any watched changes to the package.

- If you run the declarations watcher, you should also get real-time updates in your IDE for types and documentation. In some instances, you may need to refresh or reload your IDE's view to clear any cached values.

- Because the `dist` folder is not bundled into the repo, you may need to run a build or include it in a commit if you are testing an installation via Github.

### Roadmap

- [x] Convert existing packages (koji-vcc, koji-database, etc.) to a single package
- [x] Implement single instance to prevent race conditions/multiple sources of truth
- [x] Implement TypeScript best practices
- [x] Implement development tooling
- [ ] Support https://unpkg.com/
- [ ] Improve TypeDoc implementation
- [ ] Improve test coverage
- [ ] Reduce bundle size
- [ ] Auto-magical e2e testing in the debugger
