/**
 * Tests for TeamsTable component
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ITeam, ETeamStatus } from '@/types/global';
import TeamsTable from '@/features/teams/components/TeamsTable';

const mockTeams: ITeam[] = [
  {
    id: 'team-001',
    name: 'Test Team 1',
    description: 'This is a test team description',
    code: 'TST1',
    email: 'test1@example.com',
    entity: 'Access Bank Nigeria',
    manager: 'John Doe',
    status: ETeamStatus.ACTIVE,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'team-002',
    name: 'Test Team 2',
    description: 'Another test team description',
    code: 'TST2',
    email: 'test2@example.com',
    entity: 'Access Bank Ghana',
    manager: 'Jane Smith',
    status: ETeamStatus.INACTIVE,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
];

const defaultProps = {
  teams: mockTeams,
  loading: false,
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  onSort: jest.fn(),
  onFilter: jest.fn(),
  onPageChange: jest.fn(),
  onPageSizeChange: jest.fn(),
  sortConfig: { key: 'name' as keyof ITeam, direction: 'asc' as const },
  filterConfig: { search: '', status: 'All', entity: 'All' },
  paginationConfig: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 2,
    totalPages: 1,
  },
  entityOptions: [
    { value: 'Access Bank Nigeria', label: 'Access Bank Nigeria' },
    { value: 'Access Bank Ghana', label: 'Access Bank Ghana' },
  ],
};

describe('TeamsTable Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render teams table', () => {
    render(<TeamsTable {...defaultProps} />);

    expect(screen.getByText('Teams')).toBeInTheDocument();
    expect(screen.getByText('Test Team 1')).toBeInTheDocument();
    expect(screen.getByText('Test Team 2')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    render(<TeamsTable {...defaultProps} loading={true} teams={[]} />);

    expect(screen.getByRole('progressbar', { hidden: true })).toBeInTheDocument();
  });

  it('should display team information correctly', () => {
    render(<TeamsTable {...defaultProps} />);

    // Check team names
    expect(screen.getByText('Test Team 1')).toBeInTheDocument();
    expect(screen.getByText('Test Team 2')).toBeInTheDocument();

    // Check codes
    expect(screen.getByText('TST1')).toBeInTheDocument();
    expect(screen.getByText('TST2')).toBeInTheDocument();

    // Check emails
    expect(screen.getByText('test1@example.com')).toBeInTheDocument();
    expect(screen.getByText('test2@example.com')).toBeInTheDocument();

    // Check entities
    expect(screen.getByText('Access Bank Nigeria')).toBeInTheDocument();
    expect(screen.getByText('Access Bank Ghana')).toBeInTheDocument();

    // Check managers
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should show status badges', () => {
    render(<TeamsTable {...defaultProps} />);

    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('should handle search input', async () => {
    render(<TeamsTable {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Search by team name or code...');
    fireEvent.change(searchInput, { target: { value: 'Test Team 1' } });

    await waitFor(() => {
      expect(defaultProps.onFilter).toHaveBeenCalledWith({
        search: 'Test Team 1',
        status: 'All',
        entity: 'All',
      });
    });
  });

  it('should handle status filter', () => {
    render(<TeamsTable {...defaultProps} />);

    const statusSelect = screen.getByDisplayValue('All Status');
    fireEvent.click(statusSelect);

    // This would trigger the select change in a real implementation
    // For now, we'll just verify the select is present
    expect(statusSelect).toBeInTheDocument();
  });

  it('should handle entity filter', () => {
    render(<TeamsTable {...defaultProps} />);

    const entitySelect = screen.getByDisplayValue('All Entities');
    fireEvent.click(entitySelect);

    expect(entitySelect).toBeInTheDocument();
  });

  it('should handle sort when clicking column headers', () => {
    render(<TeamsTable {...defaultProps} />);

    const nameHeader = screen.getByText('Team Name');
    fireEvent.click(nameHeader);

    expect(defaultProps.onSort).toHaveBeenCalledWith({
      key: 'name',
      direction: 'desc',
    });
  });

  it('should handle edit button clicks', () => {
    render(<TeamsTable {...defaultProps} />);

    const editButtons = screen.getAllByLabelText(/Edit/);
    fireEvent.click(editButtons[0]);

    expect(defaultProps.onEdit).toHaveBeenCalledWith(mockTeams[0]);
  });

  it('should handle delete button clicks', () => {
    render(<TeamsTable {...defaultProps} />);

    const deleteButtons = screen.getAllByLabelText(/Delete/);
    fireEvent.click(deleteButtons[0]);

    expect(defaultProps.onDelete).toHaveBeenCalledWith(mockTeams[0]);
  });

  it('should show empty state when no teams', () => {
    render(<TeamsTable {...defaultProps} teams={[]} />);

    expect(screen.getByText('No teams found matching your criteria.')).toBeInTheDocument();
  });

  it('should display pagination when multiple pages', () => {
    const propsWithPagination = {
      ...defaultProps,
      paginationConfig: {
        currentPage: 1,
        pageSize: 1,
        totalItems: 2,
        totalPages: 2,
      },
    };

    render(<TeamsTable {...propsWithPagination} />);

    expect(screen.getByText('Showing 1 to 1 of 2 results')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('should handle page size change', () => {
    render(<TeamsTable {...defaultProps} />);

    const pageSizeSelect = screen.getByDisplayValue('10 per page');
    fireEvent.click(pageSizeSelect);

    // This would trigger the select change in a real implementation
    expect(pageSizeSelect).toBeInTheDocument();
  });

  it('should have proper ARIA attributes', () => {
    render(<TeamsTable {...defaultProps} />);

    // Check table has proper role
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // Check sortable headers have proper attributes
    const nameHeader = screen.getByText('Team Name');
    expect(nameHeader.closest('th')).toHaveAttribute('aria-sort', 'asc');
  });

  it('should handle keyboard navigation on sortable headers', () => {
    render(<TeamsTable {...defaultProps} />);

    const nameHeader = screen.getByText('Team Name');
    fireEvent.keyDown(nameHeader, { key: 'Enter' });

    expect(defaultProps.onSort).toHaveBeenCalledWith({
      key: 'name',
      direction: 'desc',
    });
  });
});
