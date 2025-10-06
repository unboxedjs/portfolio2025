# Firebase Functions Application

This is an Nx application containing Firebase Cloud Functions for the portfolio.

## Structure

```
apps/functions/
├── src/
│   └── main.ts          # Firebase functions entry point
├── project.json         # Nx project configuration
├── package.json         # Firebase runtime dependencies
└── tsconfig.app.json    # TypeScript configuration
```

## Development

### Build

```bash
nx build functions
```

Outputs compiled functions to `dist/apps/functions/` with the following
structure:

- `src/main.js` - Compiled functions code
- `package.json` - Runtime dependencies
- `package-lock.json` - Lock file

### Lint

```bash
nx lint functions
```

### Test

```bash
nx test functions
```

### Serve (Local Emulator)

```bash
nx serve functions
```

Starts Firebase emulators for local development.

### Deploy

```bash
nx deploy functions
```

Deploys functions to Firebase. Automatically runs build and lint before
deployment.

## Adding Functions

Add your Firebase functions in `src/main.ts`:

```typescript
import { onRequest } from 'firebase-functions/https';
import * as logger from 'firebase-functions/logger';

export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});
```

## Firebase Configuration

The Firebase configuration in `firebase.json` points to `dist/apps/functions` as
the deployment source. The predeploy hook runs:

1. `nx build functions` - Compiles TypeScript
2. `nx lint functions` - Ensures code quality

## Dependencies

Runtime dependencies are specified in `apps/functions/package.json`:

- `firebase-admin` - Firebase Admin SDK
- `firebase-functions` - Firebase Functions SDK

These are automatically included in the built output.
