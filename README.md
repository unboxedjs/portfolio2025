# Portfolio 2025

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.16.0-brightgreen?logo=node.js)](https://nodejs.org/)
[![npm Version](https://img.shields.io/npm/v/npm?logo=npm&label=npm)](https://www.npmjs.com/)
[![Package Manager](https://img.shields.io/badge/package%20manager-npm-CB3837?logo=npm)](https://www.npmjs.com/)
[![Platform](https://img.shields.io/badge/platform-web-blue)](https://web.dev/)
[![Build Tool](https://img.shields.io/badge/build-Nx-143055?logo=nx)](https://nx.dev/)
[![Deployment](https://img.shields.io/badge/deployment-ready-green)](https://vercel.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=flat&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Nx](https://img.shields.io/badge/Nx-21.6-143055?style=flat&logo=nx&logoColor=white)](https://nx.dev/)
[![NgRx](https://img.shields.io/badge/NgRx-20-B7178C?style=flat&logo=reactivex&logoColor=white)](https://ngrx.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![ESLint](https://img.shields.io/badge/code_quality-ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org/)
[![Security](https://img.shields.io/badge/security-audited-4C4A73?logo=shield)](https://snyk.io/)
[![Maintenance](https://img.shields.io/badge/maintained-yes-green.svg)](https://github.com/suren/portfolio2025)
[![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen)](https://npmjs.com/)
[![Code Quality](https://img.shields.io/badge/code%20quality-A+-brightgreen)](https://eslint.org/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Code Quality](#-code-quality)
- [Release Process](#-release-process)
- [API Documentation](#-api-documentation)
- [Performance](#-performance)
- [Security](#-security)
- [Support](#-support)
- [License](#-license)

## 🚀 Overview

**Portfolio 2025** is an enterprise-grade Angular application built with modern
web technologies and best practices. This project demonstrates a scalable
monorepo architecture using Nx, comprehensive state management with NgRx, and
industry-standard development workflows.

### Key Highlights

- 🏗️ **Monorepo Architecture** - Nx-powered workspace for scalable development
- 🔄 **State Management** - NgRx for predictable state management
- 🎨 **Modern UI** - TailwindCSS for responsive design
- 🔧 **Enterprise Tooling** - Complete CI/CD, testing, and quality assurance
- 📱 **Mobile-First** - Responsive design principles
- ♿ **Accessibility** - WCAG 2.1 AA compliant
- 🌐 **Internationalization** - Multi-language support ready

## ✨ Features

### Core Functionality

- 📊 **Dashboard** - Comprehensive analytics and insights
- 👤 **User Management** - Complete user lifecycle management
- 🔐 **Authentication** - Secure JWT-based authentication
- 📱 **Responsive Design** - Mobile-first responsive layout
- 🌙 **Dark Mode** - Automatic theme switching

### Developer Experience

- 🔥 **Hot Reload** - Fast development feedback loop
- 🧪 **Testing Suite** - Unit, integration, and E2E testing
- 📊 **Code Coverage** - Comprehensive coverage reporting
- 🔍 **Static Analysis** - ESLint, Prettier, and custom rules
- 📝 **Documentation** - Auto-generated API documentation

### DevOps & Deployment

- 🚀 **CI/CD Pipeline** - Automated testing and deployment
- 🐳 **Containerization** - Docker support for consistent environments
- 📈 **Monitoring** - Application performance monitoring
- 🔒 **Security Scanning** - Automated vulnerability detection

## 🛠 Technology Stack

### Frontend

| Technology      | Version | Purpose               |
| --------------- | ------- | --------------------- |
| **Angular**     | 20.3    | Core framework        |
| **TypeScript**  | 5.9     | Type-safe development |
| **NgRx**        | 20.0    | State management      |
| **TailwindCSS** | 4.1     | Utility-first CSS     |
| **RxJS**        | 7.8     | Reactive programming  |

### Development Tools

| Tool           | Version | Purpose                |
| -------------- | ------- | ---------------------- |
| **Nx**         | 21.6    | Monorepo management    |
| **Jest**       | 29.7    | Unit testing           |
| **Cypress**    | 14.2    | E2E testing            |
| **ESLint**     | 9.8     | Code linting           |
| **Prettier**   | 2.6     | Code formatting        |
| **Husky**      | 9.1     | Git hooks              |
| **Commitizen** | 4.3     | Commit standardization |

### Build & Deploy

| Tool               | Purpose               |
| ------------------ | --------------------- |
| **Vite**           | Fast build tool       |
| **Docker**         | Containerization      |
| **GitHub Actions** | CI/CD pipeline        |
| **Nginx**          | Production web server |

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** >= 18.16.0
- **npm** >= 9.0.0
- **Git** >= 2.25.0

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/unboxedjs/portfolio2025.git
   cd portfolio2025
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   nx serve frontend
   ```

4. **Open your browser**
   ```
   http://localhost:4200
   ```

### Quick Commands

```bash
# Development
nx serve frontend           # Start development server
nx build frontend           # Build for production
nx test frontend            # Run unit tests
nx e2e frontend-e2e         # Run E2E tests

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
npm run typecheck          # Run TypeScript compiler

# Releases
npm run commit             # Commitizen interactive commit
npm run release            # Create new release
```

## 🧑‍💻 Development

### Development Workflow

1. **Create feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**

   ```bash
   # Follow conventional commits
   npm run commit
   ```

3. **Run tests and linting**

   ```bash
   nx test frontend
   npm run lint
   nx e2e frontend-e2e
   ```

4. **Create pull request**

### Code Standards

- **TypeScript** - Strict mode enabled
- **ESLint** - Extended from Angular and Nx configurations
- **Prettier** - Automatic code formatting
- **Conventional Commits** - Standardized commit messages
- **Angular Style Guide** - Official Angular coding standards

### Architecture Patterns

- **Feature Modules** - Organized by business domain
- **Smart/Dumb Components** - Container and presentation pattern
- **State Management** - NgRx for complex state
- **Dependency Injection** - Angular's DI system
- **Reactive Programming** - RxJS observables

## 🧪 Testing

### Testing Strategy

```bash
# Unit Tests
nx test frontend                # Run unit tests
nx test frontend --watch        # Run tests in watch mode
nx test frontend --coverage     # Generate coverage report

# E2E Tests
nx e2e frontend-e2e            # Run E2E tests
nx e2e frontend-e2e --watch    # Run E2E tests in watch mode

# All Tests
nx run-many -t test            # Run all unit tests
nx run-many -t e2e             # Run all E2E tests
```

### Coverage Requirements

- **Unit Tests**: > 80% coverage
- **Integration Tests**: Critical user paths
- **E2E Tests**: Complete user workflows

## 🚀 Deployment

### Environment Setup

```bash
# Development
nx serve frontend

# Production Build
nx build frontend --configuration=production

# Preview Production Build
nx serve frontend --configuration=production
```

### Docker Deployment

```bash
# Build Docker image
docker build -t portfolio2025 .

# Run container
docker run -p 80:80 portfolio2025
```

### CI/CD Pipeline

The project uses GitHub Actions for automated:

- ✅ **Testing** - Unit, integration, and E2E tests
- 🔍 **Code Quality** - Linting and formatting checks
- 🔒 **Security** - Vulnerability scanning
- 📦 **Building** - Production builds
- 🚀 **Deployment** - Automatic deployment to staging/production

## 📁 Project Structure

```
portfolio2025/
├── apps/
│   ├── frontend/                 # Main Angular application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── store/        # NgRx state management
│   │   │   │   ├── services/     # Business logic services
│   │   │   │   └── components/   # UI components
│   │   │   └── assets/           # Static assets
│   │   └── project.json          # Project configuration
│   └── frontend-e2e/             # E2E tests
├── libs/                         # Shared libraries
├── tools/                        # Custom build tools
├── .github/                      # GitHub workflows
├── .husky/                       # Git hooks
├── .vscode/                      # VS Code settings
├── docs/                         # Documentation
├── CHANGELOG.md                  # Release notes
├── CONTRIBUTING.md               # Contribution guidelines
├── nx.json                       # Nx configuration
└── package.json                  # Dependencies and scripts
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md)
for details.

### Development Process

1. **Fork** the repository
2. **Create** your feature branch
3. **Commit** using conventional commits
4. **Test** your changes thoroughly
5. **Submit** a pull request

### Code Review Process

- All changes require review
- Automated tests must pass
- Code coverage requirements must be met
- Documentation must be updated

## 🔍 Code Quality

### Static Analysis Tools

- **ESLint** - Code linting and best practices
- **Prettier** - Consistent code formatting
- **TypeScript** - Type safety and code intelligence
- **SonarQube** - Code quality and security analysis
- **Commitlint** - Commit message validation

### Quality Gates

- ✅ All tests pass
- ✅ Code coverage > 80%
- ✅ No ESLint errors
- ✅ No TypeScript errors
- ✅ Security vulnerabilities resolved

## 📦 Release Process

### Semantic Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** - Breaking changes
- **MINOR** - New features
- **PATCH** - Bug fixes

### Release Commands

```bash
# Automatic release (recommended)
npm run release

# Manual release types
npm run release:patch          # 1.0.0 → 1.0.1
npm run release:minor          # 1.0.0 → 1.1.0
npm run release:major          # 1.0.0 → 2.0.0

# Preview release
npm run release:dry            # See what would be released
```

### Changelog

All changes are automatically documented in the [CHANGELOG.md](CHANGELOG.md)
using conventional commits.

## 📚 API Documentation

### Documentation Tools

- **Compodoc** - Angular documentation generator
- **Storybook** - Component documentation
- **Swagger** - API documentation
- **JSDoc** - Code documentation

### Generate Documentation

```bash
npx @compodoc/compodoc -p tsconfig.json -s    # Generate and serve docs
nx storybook frontend                          # Start Storybook server
```

## ⚡ Performance

### Performance Targets

- **First Contentful Paint** < 1.5s
- **Largest Contentful Paint** < 2.5s
- **First Input Delay** < 100ms
- **Cumulative Layout Shift** < 0.1

### Optimization Features

- **Lazy Loading** - Route-based code splitting
- **Tree Shaking** - Dead code elimination
- **Bundle Analysis** - Size optimization
- **Service Workers** - Caching strategies
- **CDN Integration** - Asset delivery optimization

### Performance Monitoring

```bash
nx build frontend --configuration=production --stats-json
npx webpack-bundle-analyzer dist/apps/frontend/stats.json
```

## 🔒 Security

### Security Measures

- **Dependency Scanning** - Automated vulnerability detection
- **HTTPS Enforcement** - Secure communication
- **CSP Headers** - Content Security Policy
- **CSRF Protection** - Cross-site request forgery prevention
- **XSS Prevention** - Cross-site scripting protection

### Security Audits

```bash
npm audit                    # Check for vulnerabilities
npm audit fix                # Fix automatically fixable vulnerabilities
```

## 🆘 Support

### Getting Help

- 📖 **Documentation** - Check the [docs](./docs) folder
- 🐛 **Bug Reports** - Use
  [GitHub Issues](https://github.com/unboxedjs/portfolio2025/issues)
- 💬 **Discussions** - Use
  [GitHub Discussions](https://github.com/unboxedjs/portfolio2025/discussions)
- 📧 **Email** - Contact [maintainers](mailto:team@portfolio2025.com)

### Nx Resources

- 🔗 **Nx Documentation** - [Official Nx Docs](https://nx.dev)
- 🎓 **Nx Tutorials** -
  [Angular Monorepo Tutorial](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial)
- 📊 **Nx Console** -
  [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)
- 💬 **Nx Community** - [Discord](https://go.nx.dev/community)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

---

<div align="center">

**Built with ❤️ using Nx, Angular, and modern web technologies**

[⭐ Star this repo](https://github.com/unboxedjs/portfolio2025) •
[🐛 Report Bug](https://github.com/unboxedjs/portfolio2025/issues) •
[✨ Request Feature](https://github.com/unboxedjs/portfolio2025/issues)

</div>
