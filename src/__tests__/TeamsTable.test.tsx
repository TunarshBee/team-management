import TeamsTable from '@/features/teams/components/TeamsTable';
import { ETeamStatus, ITeam } from '@/types/global';
import { render, screen } from '@testing-library/react';

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
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  onCreateTeam: jest.fn(),
};

describe('TeamsTable Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render teams table', () => {
    render(<TeamsTable {...defaultProps} />);

    expect(screen.getByText('Test Team 1')).toBeInTheDocument();
    expect(screen.getByText('Test Team 2')).toBeInTheDocument();
  });

  it('should display team information correctly', () => {
    render(<TeamsTable {...defaultProps} />);

    expect(screen.getByText('Test Team 1')).toBeInTheDocument();
    expect(screen.getByText('Test Team 2')).toBeInTheDocument();
    expect(screen.getByText('TST1')).toBeInTheDocument();
    expect(screen.getByText('TST2')).toBeInTheDocument();
    expect(screen.getByText('test1@example.com')).toBeInTheDocument();
    expect(screen.getByText('test2@example.com')).toBeInTheDocument();
    expect(screen.getByText('Access Bank Nigeria')).toBeInTheDocument();
    expect(screen.getByText('Access Bank Ghana')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should have proper table structure', () => {
    render(<TeamsTable {...defaultProps} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('should show empty state when no teams', () => {
    render(<TeamsTable {...defaultProps} teams={[]} />);

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });
});
