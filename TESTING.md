# Testing Guide

This project includes both unit tests and E2E tests.

## Unit Tests

Unit tests are written using [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/react).

### Running Unit Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Files

- `src/App.test.tsx` - Tests for the main App component and cellRender function

### Writing Unit Tests

Unit tests should be placed next to the components they test, with a `.test.tsx` extension.

Example:
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

## E2E Tests

E2E tests are written using [Playwright](https://playwright.dev/).

### Running E2E Tests

First, install the Playwright browsers:

```bash
npx playwright install
```

Then run the tests:

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

### Test Files

- `e2e/app.spec.ts` - E2E tests for the calendar application

### Writing E2E Tests

E2E tests should be placed in the `e2e/` directory with a `.spec.ts` extension.

Example:
```typescript
import { test, expect } from '@playwright/test'

test('should display the page', async ({ page }) => {
  await page.goto('/optimax-prime/')
  await expect(page.getByText('Expected Text')).toBeVisible()
})
```

## Test Configuration

- `vitest.config.ts` - Configuration for Vitest unit tests
- `playwright.config.ts` - Configuration for Playwright E2E tests
- `src/test/setup.ts` - Test setup file for Vitest

## Continuous Integration

Both unit tests and E2E tests can be run in CI/CD pipelines. The E2E tests will automatically build and serve the application before running the tests.
