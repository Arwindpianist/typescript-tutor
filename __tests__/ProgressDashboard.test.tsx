import { render, screen, fireEvent } from '@testing-library/react';
import { ProgressDashboard } from '../../components/ProgressDashboard';

describe('ProgressDashboard', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders progress dashboard', () => {
    render(<ProgressDashboard />);
    expect(screen.getByText('Your Progress')).toBeInTheDocument();
  });

  test('shows correct initial stats', () => {
    render(<ProgressDashboard />);
    expect(screen.getByText('Completed Lessons: 0')).toBeInTheDocument();
  });

  test('exports progress', () => {
    render(<ProgressDashboard />);
    const exportButton = screen.getByText('Export Progress');
    fireEvent.click(exportButton);
    // Add assertions for export functionality
  });
});
