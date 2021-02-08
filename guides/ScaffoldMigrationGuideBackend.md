# Scaffold Migration Guide (Backend)

If you have been using the most recent React/Express Scaffold, this migration guide is for you.

Note: This guide assumes you have already walked through the accompanying [frontend guide](ScaffoldMigrationGuideFrontend.md).

## Notable Differences

Similar to the changes you saw in the frontend, you will notice that we've removed the need to install multiple dependencies, and that everything lives in the `@withkoji/core` package.

We've also made an effort to make middleware and constructors easier to reason about, especially if you are using an `express`-backed backend.

Finally, modules should align more closely with their frontend counterparts, making it easier to understand interactions between the client and server.

Let's get started!

## @withkoji/core

### Installation

`npm install @withkoji/core`

### Middleware

Because one backend serves not only the original (gen0) template, but all of the remixes that stem from the template, we need a way to scope things like databases, dispatches, identity lookups, etc.

Koji helps us with that scoping by attaching much of the remix-specific data to the headers of requests that are being sent to the backend.

Fortunately, by using the `KojiBackend.middleware`, we can remove most of the need to parse and digest that header information, and use things like Database and Dispatch with confidence, knowing the calls that we're making will be scoped correctly.

Because we also want to have access to `remixData` on the backend, we'll need to pass in our `koji.json` file to set the initial structure of the `remixData` (that will be overriden automatically by the middleware for remix-specific data).

Here is a sample implementation given a traditional express application:

```
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { KojiBackend } from '@withkoji/core';

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

// Koji Middleware
app.use(KojiBackend.middleware(kojiConfig));

// Disable caching
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

// Add our routes here

// Start server
app.listen(process.env.PORT || 3333, null, async err => {
  if (err) {
    console.log(err.message);
  }
  console.log('[koji] backend started');
});
```

There are a number of additional middlewares included in this snippet, mostly to help handle common express/backend needs like parsing incoming body data and handling CORS compatibility.

The `KojiBackend.middleware` will transform `res.locals` and add the project/remix specific data required to scope calls correctly. Fortunately, the modules in `KojiBackend` will accept `res` as a configuration parameter and will expect that the middleware has already made transformations to `res.locals`. This means that it's important to make sure that the middleware is applied **before** any routes are handled.

### Constructors

One of the biggest changes introduced by `@withkoji/core` is simplifying the constructor patterns for the backend modules.

Each of the backend modules (Database, Dispatch, IAP, Identity, and Secret) all follow the same constructor pattern:

```
...

app.get('/set-item', async (req, res) => {
  // Pass the middleware-transformed res into the constructor
  const database = new KojiBackend.Database({ res });
}); 

...
```

### Database

The database module follows the same pattern as previous implementations:

```
...

app.get('/set-item', async (req, res) => {
  const database = new KojiBackend.Database({ res });

  // Get some data from the user
  const { item } = req.body;
  
  // Write the item to the database with a unique id
  const update = await database.set('items', 'unique-id', item);

  // Return the item
  res.status(200).json({
    item: update,
  });
}); 

...
```

### Dispatch

The dispatch module follows a very similar pattern as previous implementations:

```
...
app.get('/dispatch-event', async (req, res) => {
  const dispatch = new KojiBackend.Dispatch({ res });

  // Wait for a connection (`connection` will have information about the connection)
  const connection = await dispatch.connect({});

  // Send a message to all connected users (in the scope of the template/remix)
  dispatch.emitEvent('test', { hello: 'world' });

  res.status(200).json({
    messageSent: true,
  });
});
...
```

### IAP

The in app purchase module is very similar to previous implementations, with some renaming of methods (to make them easier to reason about):

```
...
app.get('/receipts-by-user', async (req, res) => {
  const iap = new KojiBackend.IAP({ res });
  
  // Get the user token (generated using the frontend identity module)
  const token = req.headers.authorization;
  
  // Get receipts by user
  const receipts = await iap.resolveReceiptsByUserToken(token);
  
  res.status(200).json({
    receipts,
  });
});
...
```

### Identity

Identity on the backend has been reworked into two main pieces, notifications and user data. 

Notifications now has two methods, `pushNotificationToUser` and `pushNotificationToOwner`. The former will expect a `userId` (not a token), because the user will have needed to grant permission to retrieve their userId and send a push notification.

Resolving user data has been condensed into one method, `resolveUserFromToken`:

```
...
app.get('/get-user-role', async (req, res) => {
  const identity = new KojiBackend.Identity({ res });
  
  // Get the user token (generated using the frontend identity module)
  const token = req.headers.authorization;
  
  // Resolve the user
  const user = await identity.resolveUserFromToken(token);
  
  const {
    id,           // The userId (specific to the template/remix)
    attributes,   // Attributes about the user (username, etc)
    dateCreated,  // When the user first shared information
    grants,       // Any permissions the user has granted
    role,         // The user's role
  } = user;
  
  res.status(200).json({
    role,
  });
});
...
```

### Secret

The secret module now encompasses two methods: `resolveSecret` and `generateSignedURL`. These methods will allow you to continue to store and resolve secret data:

```
...
app.post('/resolve-secret', async (req, res) => {
  const secret = new KojiBackend.Secret({ res });

  // Decrypt the value
  const decryptedValue = await secret.resolveValue(req.body.encryptedValue);

  // Typically you would have a paywall/blocker in front of returning a secret value =)
  res.status(200).json({
    decryptedValue,
  });
});
...
``` 

Hopefully at this point you have been able to implement @withkoji/core in your backend as well and you can experience the same joy that you did on the frontend:

```
npm remove @withkoji/auth @withkoji/dispatch @withkoji/database @withkoji/iap @withkoji/vcc
```

Please reach out to @diddy with any questions or issues! =)