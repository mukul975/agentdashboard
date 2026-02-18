import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';

// Mock child components that have their own complex rendering
vi.mock('../ConnectionStatus', () => ({
  ConnectionStatus: () => <div data-testid="connection-status" />
}));

vi.mock('../ExportMenu', () => ({
  ExportMenu: () => <div data-testid="export-menu" />
}));

// Mock lucide-react icons as simple spans with accessible labels
vi.mock('lucide-react', () => ({
  Activity: (props) => <span data-testid="icon-activity" {...props} />,
  ExternalLink: (props) => <span data-testid="icon-external-link" {...props} />,
  Menu: (props) => <span data-testid="icon-menu" {...props} />,
  X: (props) => <span data-testid="icon-x" {...props} />,
  Bell: (props) => <span data-testid="icon-bell" {...props} />,
  Sun: (props) => <span data-testid="icon-sun" {...props} />,
  Moon: (props) => <span data-testid="icon-moon" {...props} />,
  Search: (props) => <span data-testid="icon-search" {...props} />,
  Keyboard: (props) => <span data-testid="icon-keyboard" {...props} />,
}));

describe('Header', () => {
  const defaultProps = {
    isConnected: true,
    error: null,
    onMenuToggle: vi.fn(),
    isMenuOpen: false,
    theme: 'dark',
    onToggleTheme: vi.fn(),
    onToggleNotifications: vi.fn(),
    notifUnreadCount: 0,
    onToggleShortcuts: vi.fn(),
    onNavigate: vi.fn(),
    teams: [],
    allInboxes: {},
  };

  it('renders with correct title', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('Claude Agent Dashboard')).toBeInTheDocument();
  });

  it('renders subtitle text', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('Real-time agent monitoring')).toBeInTheDocument();
  });

  it('calls onToggleTheme when theme toggle button is clicked', () => {
    const onToggleTheme = vi.fn();
    render(<Header {...defaultProps} onToggleTheme={onToggleTheme} />);

    const themeBtn = screen.getByLabelText('Switch to light mode');
    fireEvent.click(themeBtn);
    expect(onToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('shows Sun icon in dark mode and Moon icon in light mode', () => {
    const { rerender } = render(<Header {...defaultProps} theme="dark" />);
    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument();

    rerender(<Header {...defaultProps} theme="light" />);
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();
  });

  it('shows notification badge when unreadCount > 0', () => {
    render(<Header {...defaultProps} notifUnreadCount={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows 99+ when unreadCount exceeds 99', () => {
    render(<Header {...defaultProps} notifUnreadCount={150} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('does not show notification badge when unreadCount is 0', () => {
    render(<Header {...defaultProps} notifUnreadCount={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('calls onToggleNotifications when bell button is clicked', () => {
    const onToggleNotifications = vi.fn();
    render(<Header {...defaultProps} onToggleNotifications={onToggleNotifications} notifUnreadCount={3} />);

    const bellBtn = screen.getByLabelText('Notifications (3 unread)');
    fireEvent.click(bellBtn);
    expect(onToggleNotifications).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleShortcuts when keyboard shortcuts button is clicked', () => {
    const onToggleShortcuts = vi.fn();
    render(<Header {...defaultProps} onToggleShortcuts={onToggleShortcuts} />);

    const shortcutsBtn = screen.getByLabelText('Show keyboard shortcuts');
    fireEvent.click(shortcutsBtn);
    expect(onToggleShortcuts).toHaveBeenCalledTimes(1);
  });

  it('shows LIVE indicator when connected', () => {
    render(<Header {...defaultProps} isConnected={true} />);
    expect(screen.getByText('LIVE')).toBeInTheDocument();
    expect(screen.getByLabelText('Live and connected')).toBeInTheDocument();
  });

  it('shows disconnected status when not connected', () => {
    render(<Header {...defaultProps} isConnected={false} />);
    expect(screen.getByLabelText('Disconnected')).toBeInTheDocument();
  });

  it('renders header with banner role', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
