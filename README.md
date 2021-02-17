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

## Documentation

Package documentation is available [here](https://madewithkoji.github.io/koji-core/).

## Migration

If you are migrating a project from the React/Express Scaffold, you may find these [frontend](guides/ScaffoldMigrationGuideFrontend.md) and [backend](guides/ScaffoldMigrationGuideBackend.md) guides helpful.

## Basic use

### Frontend

Enable the user to upload an image from the frontend of the Koji.

```
import Koji from '@withkoji/core';

const captureImage = async () => {
  const imageURL = await Koji.ui.capture.image();

  console.log(imageURL); // The publicly accessible, CDN-backed path of the user's uploaded image
}
```

### Backend

Use the Koji database on the backend of the Koji, and use middleware to scope operations per remix.

```
import { KojiBackend } from '@withkoji/core';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

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
app.use(KojiBackend.middleware);

app.get('/data', (req, res, next) => {
  const database = new KojiBackend.Database({ res });

  // Look up an item in the items collection
  const item = await database.get('items', 'myItemId');

  res.status(200).json({
    item,
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```

## Related resources

- [What is remixing?](https://developer.withkoji.com/docs/getting-started/instant-remixing)
- [Developing your first Koji template](https://developer.withkoji.com/docs/getting-started/start-guide-1)
- [Koji homepage](http://withkoji.com/)

## Contributions and questions

See the [contributions page](https://developer.withkoji.com/docs/about/contribute-koji-developers) on the developer site for info on how to make contributions to Koji repositories and developer documentation.

For any questions, reach out to the developer community or the `@Koji Team` on our [Discord server](https://discord.gg/9egkTWf4ec).
