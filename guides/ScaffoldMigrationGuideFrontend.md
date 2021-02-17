# Scaffold Migration Guide (Frontend)

If you have been using the most recent React/Express Scaffold, this migration guide is for you. The scaffold set out to make it easier to develop complex templates, but with the recent platform changes and `@withkoji/core` package updates, much of the work that the scaffold was doing is now obsolete. So let's get rid of the cruft!

## Migrating JSON Files

### Reasoning

Moving forward, we are recommending that developers store all of their template configuration inside of one `koji.json` file at the root of the project.

In addition to adhering to [12 Factor App Development](https://12factor.net/config), keeping all of the initial configuration options inside of one file means we can avoid using things like `fs` to patch together multiple files into one, digestible configuration.

### Implementation

Currently, most projects have their configuration spread across multiple json files. You will want to create one `koji.json` file at the root of your project and include:

- Deploy instructions (the `deploy` key and its contents)
- Develop instructions (the `develop` key and its contents)
- Any entitlements for your template (the `entitlements` key and its contents)
- Any initial remix data (stored in the `remixData` key)
- Any transforms that need to be applied for new remixes (stored in the `@@initialTransform` key

A sample `koji.json` file:

```
{
  "develop": {
    "frontend": {
      "path": "frontend",
      "port": 8080,
      "startCommand": "npm start"
    },
    "backend": {
        "path": "backend",
        "port": 3333,
        "startCommand": "npm run start-dev"
    }
  },
  "deploy": {
    "frontend": {
      "output": "frontend/build",
      "type": "static",
      "commands": [
        "cd frontend",
        "npm install",
        "export NODE_ENV=production && npm run build"
      ]
    },
    "backend": {
      "output": "backend",
      "type": "dynamic",
      "commands": [
        "cd backend",
        "npm install",
        "export NODE_ENV=production && npm run compile"
      ]
    }
  },
  "remixData": {
    "backgroundColor": "#ffffff",
    "title": "My Template"
  },
  "@@initialTransform": {
    "remixData": {
      "backgroundColor": "#ff7200"
    }
  },
  "entitlements": {
    "InstantRemixing": true,
    "FeedEvents": true,
    "InstantRemixingNativeNavigation": true,
    "CustomMetadata": {
      "enabled": true,
      "metadata": {
        "title": "Default Title",
        "description": "{{remixData.title}}"
      }
    },
    "AdminContext": true
  }
}
```

After you have migrated the data from the json files in the `.koji` folder, you can safely remove that folder.

## Moving from Webpack/React to Create React App

Many projects, especially ones using recent scaffolds are using a combination of Webpack and React to develop and create production builds on the frontend. Moving forward, we can now remove Webpack and use a combination of `react-scripts` and `react-app-rewired` to get the same benefits we had in the past without needing to use a complex Webpack configuration.

### Webpack cleanup

First, we will remove any Webpack-specific files. These are commonly stored inside the `.internals` folder inside of the `frontend` folder. Note that this guide will cover replacing core functionality, but there may be additional modifications to your Webpack set up that will require additional work.

Remove the `.internals` folder from your `frontend` folder.

Second, we will want to remove any Webpack-specific packages, as well as packages that were specifically installed to support the dev/build process.

`npm remove webpack webpack-cli webpack-dev-server style-loader react-hot-loader html-webpack-plugin html-loader exports-loader css-loader babel-loader babel-cli babel @babel/core @babel/plugin-syntax-dynamic-import @babel/plugin-transform-destructuring @babel/preset-env @babel/preset-react @babel babel-cli babel-loader @babel/plugin-proposal-class-properties babel-preset-react`

Note: You will still be able to use things like class properties, as transpiling will be handled by `react-scripts` instead of Webpack and babel.

### react-scripts

Next we will install `react-scripts` to help us replace Webpack's dev/build functionality:

`npm install react-scripts`

Note: `react-scripts` will expect your application to adhere to a common structure. 

Namely, your `index.html` file will be expected to live in a `public` folder. You can create that file and folder in one step by using the `New File` feature (click on the plus sign next to the `frontend` folder in the editor). Choose `/frontend/public/index.html` as the filename and move the content from your `index.html` file here.

Your application's React code will be expected to live in a `src` folder, with an `index.js` entry point. In most cases, if your code does not already live in that folder, you can create a `src` folder and move your React code into that folder.
 
### react-app-rewired

The team behind `react-scripts` has made many opinionated decisions about what the experience should look like for developers that adopt the `create-react-app` pattern for building apps. Some of those decisions make it very difficult to implement patterns that make Koji (and the `@withkoji/core` package) easy to use.

We can use `react-app-rewired` to modify the default behaviors inside of `react-scripts` without needing to completely `eject` from the ecosystem.

First, install the package:

`npm install -D react-app-rewired`

Note that because `react-app-rewired` is only used to modify the `react-scripts`, it can be installed as a `devDependency`.

Next, replace the `scripts` in your `package.json` file:

```
"scripts": {
  "start": "PORT=8080 BROWSER=none react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-scripts eject"
}
```

We need to provide `react-app-rewired` with a file that tells the package how we would like to modify the default behavior of `react-scripts`. Do this by creating a `config-overrides.js` file in the `/frontend` folder and adding the following content:

```
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const { alias } = require('react-app-rewire-alias')

module.exports = function override(config, env) {
  // Allow for imports outside of the `src` folder
  config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

  // Create aliases for absolute imports
  return alias({
    Components: 'src/Components',
    Store: 'src/Store',
    utils: 'src/utils',
  })(config);
};
```

These overrides will allow us to import the `koji.json`file from the root of our project instead of needing to keep it inside of the `frontend/src` folder. Also, if you are migrating from the scaffold, you will want to alias the `Components`, `Store` and `utils` folders so that absolute-style imports will continue to work properly.

Note that we are also using `react-app-rewire-alias`, so lets install that as a `devDependency` as well:

`npm install -D react-app-rewire-alias`

At this point, you should be able to run `npm start`. You will likely see errors inside your application, as we are no longer running the old watcher, and things depending on `@withkoji/vcc` will be broken.

If your application is failing to compile, you may be running into one of the following errors:

If you see an error related to `react-dev-utils`, it may mean that your `package-lock.json` file is causing some dependency conflicts. To resolve you can `rm -rf node-modules package-lock.json` and then `npm install` to re-create the folder and file.

If your `index.js` entry point was using `react-hot-loader`, you can remove that import and the `AppContainer` wrapper component, as well as any `module.hot` specific code, as that will automatically be handled by `react-scripts` moving forward.

If you are using `eslint` in your project, you may need to remove the `babel` specific code from your eslint configuration file (commonly `.eslintrc.json`). This will typically mean removing the `parser` and `parserOptions` keys from that file.

If you are using `eslint` in your project, you will find that the latest versions of `react-scripts` will prevent a dev build from compiling if there are linting errors. You can turn those errors into warnings (old behavior) by replacing the `start` script with: `"start": "ESLINT_NO_DEV_ERRORS=true PORT=8080 BROWSER=none react-app-rewired start"` and the `build` script with `"build": "DISABLE_ESLINT_PLUGIN=true react-app-rewired build"`.

If you encounter more errors that aren't listed here, please contact @diddy so that we can get them resolved and add them to this guide!
 
## @withkoji/core

### Installation

For the most part, our dev and build workflows should be cleaned up and ready for our package migration. Install the new package:

`npm install @withkoji/core`

### Configuration

The new package will expect to be initialized with configuration data, pulled primarily from your `koji.json` file. This will do a few things:

 - Initialize your `remixData`
 - Create a map of services (available at `Koji.services`)
 - Make your `projectId` available to modules that require it
 
Ideally this is done one time, before any data in your application is rendered:

```
import React from 'react';
import ReactDOM from 'react-dom';
import Koji from '@withkoji/core';
import './index.css';
import App from './App';

// Import our configuration file (will automatically be parsed from json)
import kojiConfig from '../../koji.json';

// Inform the platform about our configuration, and pass some project-specific values
// that are mapped in the frontend/.env file
//
// It is important to call this before trying to reference any remix data inside your
// template, so we have moved it outside of the initial react render function

Koji.config(kojiConfig, {
  projectId: process.env.REACT_APP_PROJECT_ID,
  services: {
    backend: process.env.REACT_APP_BACKEND_URL,
    frontend: process.env.REACT_APP_FRONTEND_URL,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

If you look closely, you'll see that we are using several environment variables that we haven't defined anywhere yet. That's because the `@withkoji/core` package is designed to look for things like projectId, and service definitions at specific env var locations.

Inside the editor, these are available at `KOJI_PROJECT_ID` and `KOJI_SERVICE_URL_nameofservice`. React will prevent the `@withkoji/core` package from seeing these env vars because it restricts all variables to ones that are prefixed with `REACT_APP` (besides `NODE_ENV`).

We can use an `.env` file to expand the variables and make them available. To do that, create an `.env` file in your `frontend` folder and add the following:

```
## Note: The Koji.config function will automatically look for some environment variables
## that are set inside of the Koji editor environment. However, in a Create React App project,
## all variables need to be accessible with a REACT_APP prefix, so we will use this file
## to map those variables to ones we can access inside of React.

REACT_APP_FRONTEND_URL=$KOJI_SERVICE_URL_frontend
REACT_APP_BACKEND_URL=$KOJI_SERVICE_URL_backend
REACT_APP_PROJECT_ID=$KOJI_PROJECT_ID
```

You can see that this will map the local env var values to ones that will be passed into your application.

Note: A common pattern is to prevent `.env` fils from being committed, as they often contain "secret" data -- things like API keys that are not meant to be shared. If you have a `.gitignore` file includes `.env`, you will want to remove that entry so that the `.env` file is committed and included in production builds!

### Module Replacement

At this point, you have loaded the package, and initialized the configuration. We can now begin to replace the deprecated packages' functions with the new package.

#### Context & Remix State

You are probably rendering different views inside your application based on context and whether the user is in remix mode.

Instead of parsing the context from the url, the context will now be available from the `playerState`:

```
const { context, receiptType } = Koji.playerState;

// Possible context values: 'about' | 'admin' | 'remix' | 'sticker' | 'receipt' | 'screenshot' | 'default'

// Possible receiptType values: 'buyer' | 'seller'
```

Listening for changes to remix mode is similar to before:

```
const unsubscribe = Koji.playerState.subscribe((isRemixing, editorAttributes) => {
  setSomeState(isRemixing);
});

// On unmount, etc to remove listeners
unsubscribe();
```

#### InstantRemixing

In general, one of the biggest changes to the way that getting, storing, and capturing data works is that everything is now dynamic and decoupled from json-defined editor types.

This enables a powerful, new pattern: maintaining your state locally and only storing the remix data right before calling `finish()`.

Let's walk through some of the changes:

If you are relying on remix data, your application will probably be erroring out with some undefined references. Let's get started by pulling that data from the new package.

In order to retrieve initial values, you have likely been using a pattern like this:

`const backgroundColor = instantRemixing.get(['general', 'backgroundColor']);`

Now, all of the initial remix data will be available as an object:

```
import Koji from '@withkoji/core';

const remixData = Koji.remix.get();

const { backgroundColor } = remixData;
```

You may be relying on things like `onSetValue`, `onValueChanged`, and `presentControl` to manage remix data. Moving forward, there are only a handful of methods you will need to use to capture and set remix data.

Capturing and storing data:

```
const imageURL = await Koji.ui.capture.image();

Koji.remix.set({ backgroundImage: imageURL });
```

Note: the `set` method works similarly to React's `setState`, and will intelligently merge your `remixData` behind the scenes:

```
const data = Koji.remix.get(); // { textColor: '#000000' }

Koji.remix.set({ backgroundImage: 'https://myImage.com/hello.jpg' });

const newData = Koji.remix.get(); // { textColor: '#000000',  backgroundImage: 'https://myImage.com/hello.jpg' }
```

If you need to explicitly set the entire object, you can use `overwrite`:

```
Koji.remix.overwrite({
  backgroundImage: 'someValue',
  textColor: '#000000',
});
```

When you are ready to move to the preview, you can set your updated data, wait for the platform to confirm that the data has been saved, and advance the view:

```
const onFinish = async () => {
  await Koji.remix.set({
    ...this.state, // Just an example where the state reflects remixData
  });
  
  Koji.remix.finish();
};
```

#### Services

If you are using a backend service, you will likely have been using a pattern like this to retrieve the endpoint:

`const backendURL = instantRemixing.get(['serviceMap', 'backend']);`

Moving forward, those services will be available on the `services` key:

`const backendURL = Koji.services.backend`

### Dispatch

In general, dispatch will work similarly to how it did in the past, though you will no longer need to initialize it with a constructor on the frontend. The `connect` method is also promise based, so you can `await` it before setting up listeners:

```
const connection = await Koji.dispatch.connect();

console.log(connection); // Connection details

Koji.dispatch.on('message', (payload) => doSomething(payload));

Koji.dispatch.disconnect();
```

- Removing deprecated packages
- Installing new packages
- Koji.config (react-specific)
- Using capture
- Using Koji.remix

### IAP

In-app purchases work in largely the same way as they did previously, by beginning a purchase flow by referencing the product's sku:

```
const startPurchase = async () => {
  const purchase = await Koji.iap.startPurchase('productSku');

  if (purchase.receiptId) {
    // Success
  } else {
    // User cancelled transaction
  }
};

const startDynamicPurchase = async () => {
  const purchase = await Koji.iap.startPurchase('dynamicProductSku',
    { 
      amount: 17, 
      customMessage: 'This is a custom message'.
    },
  );

  if (purchase.receiptId) {
    // Success
  } else {
    // User cancelled transaction
  }
};
```

### Identity

The Identity module replaces the `auth` functionality from previous packages, and attempts to make interactions easier to understand by exposing the following methods:

```
// Retrieve a short-lived user token to exchange on the backend
const getToken = async () => {
  const token = await Koji.identity.getToken();
};

// Silently request whether a user has already granted a set of permissions
const checkGrants = async () => {
  const hasGrants = await Koji.identity.checkGrants(['push_notifications', 'username']);
};

// Open a dialog to request new permissions from the user (and return a token)
const requestGrants = async () => {
  const token = await Koji.identity.requestGrants(['push_notifications', 'username']);
};
```

### Secret

Storing secrets presents a unique challenge, given that the platform previously relied on knowing the structure of the VCC configuration stored in json files. Fortunately, the platform has provided an alternate API that the package can leverage to continue to store data in the same way.

When you would like to save a piece of data that a) isn't visible to users by default and b) isn't copied when someone forks or remixes a template, you can use the new `encryptValue` method:

```
const storeSecretImage = async () => {
  // Capture an image (e.g., https://images.koji-cdn.com/my-image.png)
  const image = await Koji.ui.capture.image();
  
  // Make sure the user has chosen an image
  if (!image) return;
    
  // Get an encrypted value (e.g., $secret_xyz)
  const encryptedValue = await Koji.remix.encryptValue(image);
  
  // Store the value
  await Koji.remix.set({ secretImage: encryptedValue });
};
```

Now, if anyone were to examine the `remixData` from this remix, only the `encryptedValue` would be visible. In order to retrieve the value, you can use the `KojiBackend.Secret` module to securely resolve it:

```
...
import kojiConfig from '../../koji.json';

// Create server
const app = express();

// Koji Middleware
app.use(KojiBackend.middleware(kojiConfig));

app.post('/resolve-secret', async (req, res, next) => {
  // Init
  const secret = new KojiBackend.Secret({ res });

  // Pass the encrypted value in the request body
  const decryptedValue = await secret.resolveValue(req.body.encryptedValue);

  // Pass back the decrypted value (https://images.koji-cdn.com/my-image.png)
  res.status(200).json({
    decryptedValue,
  });
});
```

There is more to explore in the package, but hopefully at this point you have been able to implement `@withkoji/core` in your frontend and you can remove most of the scaffold's boilerplate (`/Store`, etc), and then run something cathartic like:

```
npm remove @withkoji/auth @withkoji/dispatch @withkoji/iap @withkoji/vcc
```

Please reach out to @diddy with any questions or issues! =)