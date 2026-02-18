import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Activity: (props) => <span data-testid="icon-activity" {...props} />,
  AlertCircle: (props) => <span data-testid="icon-alert" {...props} />,
  RefreshCw: (props) => <span data-testid="icon-refresh" {...props} />,
}));

// Mutable flag so we can stop throwing before clicking Try Again
let shouldThrow = false;

function BombComponent() {
  if (shouldThrow) {
    throw new Error('Test explosion');
  }
  return <div>Normal content</div>;
}

// Suppress React error boundary console.error noise in tests
beforeEach(() => {
  shouldThrow = false;
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('catches errors and shows full-page error UI (no name prop)', () => {
    shouldThrow = true;
    render(
      <ErrorBoundary>
        <BombComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('catches errors and shows panel-level error UI (with name prop)', () => {
    shouldThrow = true;
    render(
      <ErrorBoundary name="TestPanel">
        <BombComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('TestPanel encountered an error')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays the error message in panel-level UI', () => {
    shouldThrow = true;
    render(
      <ErrorBoundary name="TestPanel">
        <BombComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Test explosion')).toBeInTheDocument();
  });

  it('Try Again button resets error state and re-renders children', () => {
    shouldThrow = true;
    render(
      <ErrorBoundary name="TestPanel">
        <BombComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('TestPanel encountered an error')).toBeInTheDocument();

    // Stop throwing before clicking Try Again so the re-render succeeds
    shouldThrow = false;
    fireEvent.click(screen.getByLabelText('Try again'));

    expect(screen.getByText('Normal content')).toBeInTheDocument();
    expect(screen.queryByText('TestPanel encountered an error')).not.toBeInTheDocument();
  });

  it('full-page error UI has Try Again and Reload Dashboard buttons', () => {
    shouldThrow = true;
    render(
      <ErrorBoundary>
        <BombComponent />
      </ErrorBoundary>
    );
    expect(screen.getByLabelText('Try again')).toBeInTheDocument();
    expect(screen.getByLabelText('Reload dashboard')).toBeInTheDocument();
  });

  it('full-page Try Again button resets the error state', () => {
    shouldThrow = true;
    render(
      <ErrorBoundary>
        <BombComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();

    shouldThrow = false;
    fireEvent.click(screen.getByLabelText('Try again'));

    expect(screen.getByText('Normal content')).toBeInTheDocument();
  });

  it('shows troubleshooting tips in full-page error UI', () => {
    shouldThrow = true;
    render(
      <ErrorBoundary>
        <BombComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Troubleshooting Tips:')).toBeInTheDocument();
    expect(screen.getByText(/Check if the backend server is running/)).toBeInTheDocument();
  });
});
