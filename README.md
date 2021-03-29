# Koji Core

![npm (scoped)](https://img.shields.io/npm/v/@withkoji/core?color=green&style=flat-square)
[![Discord](https://img.shields.io/discord/769256827007139912.svg?style=flat-square)](https://discord.gg/9egkTWf4ec)

**Core library for developing remixable Koji templates.**

## Overview

The @withkoji/core package enables you to implement core platform features in your Koji template, including remixing, in-app purchases, UI controls, messaging, and identity services.

## Installation

Install the package in the frontend and backend services of your Koji project.

```
npm install --save @withkoji/core
```

## Basic use

The @withkoji/core package provides a set of modules that are specific to client and server behaviors.

### Frontend

Import the package in your frontend code.

```
import Koji from '@withkoji/core';
```

Initialize the package with your configuration data.

```
// Initialize
Koji.config(require('././koji.json'));

// render
render();
```

Indicate that the application is ready to start receiving events.

```
Koji.ready();
```

Enable the user to upload an image from the frontend of the Koji.

```
import Koji from '@withkoji/core';

const captureImage = async () => {
  const imageURL = await Koji.ui.capture.image();

  console.log(imageURL); // The publicly accessible, CDN-backed path of the user's uploaded image
}
```

### Backend

Import the package in your backend code.

```
import { KojiBackend } from '@withkoji/core';
```

Initialize the package with your configuration data, and use `KojiBackend.middleware` to scope operations per remix.
Add routes for backend operations (for example, use a Koji database).

```
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

// Use Koji's middleware to handle scoping across your template's remixes
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

## Related resources

* [Package documentation](https://developer.withkoji.com/reference/packages/core/withkoji-koji-core)
* [Tutorial: Koji quick start](https://developer.withkoji.com/tutorials/getting-started/quick-start)
* [Migrating to the Koji core package](https://developer.withkoji.com/docs/getting-started/migrate-koji-core)
* [Koji homepage](http://withkoji.com/)

## Contributions and questions

See the [contributions page](https://developer.withkoji.com/docs/about/contribute-koji-developers) on the developer site for info on how to make contributions to Koji repositories and developer documentation.

For any questions, reach out to the developer community or the `@Koji Team` on our [Discord server](https://discord.gg/9egkTWf4ec).
