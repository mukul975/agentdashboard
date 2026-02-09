# Contributing to Claude Agent Dashboard

Thank you for your interest in contributing to the Claude Agent Dashboard! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and collaborative environment.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/agentdashboard.git
   cd agentdashboard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Servers**
   ```bash
   # Terminal 1: Start frontend dev server
   npm run dev

   # Terminal 2: Start backend server
   npm run server
   ```

4. **Run Tests**
   ```bash
   npm test
   ```

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/feature-name` - New features
- `fix/bug-name` - Bug fixes
- `docs/description` - Documentation updates

### Creating a Pull Request

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add tests for new features
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   npm test
   npm run build
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: description of your changes"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a pull request on GitHub.

## Coding Standards

### JavaScript/React

- Use functional components with hooks
- Use PropTypes for type checking
- Follow React 19.2+ best practices
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Max line length: 100 characters
- Use arrow functions where appropriate

### Component Structure

```javascript
import React from 'react';
import PropTypes from 'prop-types';

export function ComponentName({ prop1, prop2 }) {
  // Component logic

  return (
    // JSX
  );
}

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number
};
```

### Testing

- Write tests for all new components
- Use React Testing Library
- Test user interactions, not implementation details
- Aim for meaningful test coverage

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });
});
```

## Commit Message Guidelines

Follow the Conventional Commits specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

**Examples:**
```
feat: add real-time agent status indicator
fix: resolve WebSocket connection timeout issue
docs: update installation instructions
```

## Reporting Issues

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node version, browser)

## Feature Requests

When suggesting features:

- Explain the problem it solves
- Describe your proposed solution
- Consider alternatives
- Provide use cases

## Questions?

- Check the [README](README.md) first
- Open a [Discussion](https://github.com/mukul975/agentdashboard/discussions)
- Create an [Issue](https://github.com/mukul975/agentdashboard/issues)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to making Claude Agent Dashboard better! 🚀
