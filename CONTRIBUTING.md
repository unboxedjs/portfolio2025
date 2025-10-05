# Contributing Guidelines

## Commit Message Format

This project uses [Conventional Commits](https://www.conventionalcommits.org/)
specification for commit messages.

### Using Commitizen

Instead of `git commit`, use:

```bash
npm run commit
```

This will prompt you through creating a properly formatted commit message.

### Commit Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Examples

```
feat(frontend): add user authentication
fix(api): resolve memory leak in data processing
docs(readme): update installation instructions
refactor(utils): simplify string manipulation functions
```

## Release Process

### Automatic Releases

1. **Development**: Make changes using conventional commits
2. **Release**: Run `npm run release` to:
   - Bump version in package.json
   - Generate/update CHANGELOG.md
   - Create a git tag
   - Commit the changes

### Manual Release Types

```bash
# Patch release (0.0.x) - bug fixes
npm run release:patch

# Minor release (0.x.0) - new features
npm run release:minor

# Major release (x.0.0) - breaking changes
npm run release:major

# Dry run to see what would happen
npm run release:dry
```

### Changelog

The changelog is automatically generated from commit messages. Ensure your
commits follow the conventional format for proper categorization.

## Development Workflow

1. Create a feature branch
2. Make changes with conventional commits
3. Run tests: `npm run test`
4. Run linting: `npm run lint`
5. Create a pull request
6. After merge, run release process

## Code Quality

- Pre-commit hooks run automatically to format and lint code
- All commits must pass commitlint validation
- Code coverage thresholds must be maintained
