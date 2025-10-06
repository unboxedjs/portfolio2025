# Deployment Guide

## Overview

Single unified GitHub Actions workflow that handles all CI/CD and Firebase
deployment.

**File:** `.github/workflows/firebase-deploy.yml`

## Workflow Structure

```
📦 Setup & Cache (install & cache npm)
├── 🔍 Lint (parallel)
├── 🧪 Test (parallel)
└── 🏗️ Build (parallel)
    ├── 🚀 Deploy Preview (PRs only)
    └── 🚀 Deploy Production (master only)
        └── 🎭 E2E Tests (optional, continues on error)
```

## Job Flow

### 1. Setup & Cache

- Caches `node_modules` with key: `node-modules-{package-lock-hash}`
- Runs `npm ci --legacy-peer-deps` (only if cache miss)
- All subsequent jobs reuse this cache

### 2. Lint, Test, Build (Parallel)

- All restore cached `node_modules`
- Run simultaneously after setup
- No npm install needed

### 3. Deploy

- **Preview (PRs):** Hosting preview only
- **Production (master):** All Firebase services

## What Gets Deployed

### Master Push → Production

| Service           | Source                                      | Method                                    |
| ----------------- | ------------------------------------------- | ----------------------------------------- |
| **Hosting**       | `dist/apps/frontend/browser`                | FirebaseExtended/action-hosting-deploy@v0 |
| **Functions**     | `dist/apps/functions`                       | firebase-tools CLI                        |
| **Firestore**     | `firestore.rules`, `firestore.indexes.json` | firebase-tools CLI                        |
| **Storage**       | `storage.rules`                             | firebase-tools CLI                        |
| **Remote Config** | `remoteconfig.template.json`                | firebase-tools CLI                        |

### Pull Request → Preview

| Service     | Source                       | Method                                                      |
| ----------- | ---------------------------- | ----------------------------------------------------------- |
| **Hosting** | `dist/apps/frontend/browser` | FirebaseExtended/action-hosting-deploy@v0 (preview channel) |

## Authentication

### GitHub Secret Required

**`FIREBASE_SERVICE_ACCOUNT_UNBOXEDJS_CORE`**

- Used for ALL Firebase deployments
- Service account JSON from Firebase

**How to get:**

1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate new private key
3. Copy entire JSON content
4. Add to GitHub: Settings → Secrets → Actions → New secret

## Triggers

| Event                    | Jobs                                              | Deployment         |
| ------------------------ | ------------------------------------------------- | ------------------ |
| Push to `master`         | Setup → Lint/Test/Build → Deploy Production → E2E | ✅ All services    |
| Push to `develop`        | Setup → Lint/Test/Build                           | ❌ None            |
| PR to `master`/`develop` | Setup → Lint/Test/Build → Deploy Preview          | ✅ Hosting preview |

## Performance

### Cache Hit (typical)

- Setup: ~10s (restore cache)
- Lint/Test/Build: ~60s (parallel)
- **Total: ~70s**

### Cache Miss (first run)

- Setup: ~120s (npm ci)
- Lint/Test/Build: ~60s (parallel)
- **Total: ~180s**

## Local Testing

```bash
# Install dependencies
npm ci --legacy-peer-deps

# Run what CI runs
npx nx run-many -t lint &
npx nx run-many -t test --exclude=frontend &
npx nx run-many -t build &
wait

# Deploy to Firebase (requires service account)
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
npx firebase-tools deploy --project unboxedjs-core
```

## Deployment Commands

### Via GitHub Actions (Recommended)

```bash
# Push to master for production
git push origin master

# Create PR for preview
gh pr create
```

### Manual (Local)

```bash
# All services
firebase deploy --project unboxedjs-core

# Specific services
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore
```

## Troubleshooting

### Authentication Failed

- Verify `FIREBASE_SERVICE_ACCOUNT_UNBOXEDJS_CORE` secret is set in GitHub
- Ensure service account has required permissions in Firebase Console

### Cache Not Working

```bash
# Clear GitHub Actions cache
gh cache delete --all
```

### Build Artifacts Not Found

- Ensure build job completed successfully
- Check artifact retention (1 day)

### Deployment Fails

1. Check GitHub Actions logs
2. Verify Firebase project ID: `unboxedjs-core`
3. Test build locally: `nx run-many -t build`
4. Verify service account permissions

## Project Structure

```
apps/
├── frontend/          # Angular app → Firebase Hosting
├── frontend-e2e/      # E2E tests
└── functions/         # Cloud Functions → Firebase Functions

.github/
└── workflows/
    └── firebase-deploy.yml   # Single unified workflow
```

## Firebase Configuration

**firebase.json:**

```json
{
  "hosting": {
    "public": "dist/apps/frontend/browser"
  },
  "functions": {
    "source": "dist/apps/functions",
    "predeploy": ["nx build functions", "nx lint functions"]
  }
}
```

## Monitoring

- **GitHub Actions:** https://github.com/[org]/[repo]/actions
- **Firebase Console:**
  https://console.firebase.google.com/project/unboxedjs-core

## Rollback

### Hosting

```bash
firebase hosting:channel:list
firebase hosting:clone SOURCE:CHANNEL TARGET:live
```

### Functions

```bash
# Redeploy previous version
git checkout <previous-commit>
nx build functions
firebase deploy --only functions
```

## Key Points

✅ Single workflow file for everything ✅ Setup job installs npm once, all jobs
reuse cache ✅ Lint, Test, Build run in parallel ✅ Deploy waits for all three
to complete ✅ Uses service account for authentication ✅ Deploys all Firebase
services on master push ✅ Preview deployments on pull requests ✅ Optimized
caching (~70% faster)

## Next Steps

1. Ensure `FIREBASE_SERVICE_ACCOUNT_UNBOXEDJS_CORE` secret is configured
2. Test with PR → verify preview deployment
3. Push to master → verify production deployment
