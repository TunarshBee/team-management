import { renderHook, act } from '@testing-library/react';
import { useTeamStore } from '@/stores/teamStore';
import { ETeamStatus, ITeamFormData } from '@/types/global';

// Mock the teams data
jest.mock('@/data/teams', () => ({
  mockTeams: [
    {
      id: 'team-001',
      name: 'Test Team',
      description: 'This is a test team description',
      code: 'TEST',
      email: 'test@example.com',
      entity: 'Access Bank Nigeria',
      manager: 'Test Manager',
      status: ETeamStatus.ACTIVE,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
  ],
  entityOptions: [{ value: 'Access Bank Nigeria', label: 'Access Bank Nigeria' }],
  managerOptions: [{ value: 'Test Manager', label: 'Test Manager' }],
}));

describe('Team Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useTeamStore.setState({
      teams: [],
      loading: false,
      error: null,
    });
  });

  it('should initialize with mock teams', () => {
    const { result } = renderHook(() => useTeamStore());
    expect(result.current.teams).toHaveLength(1);
    expect(result.current.teams[0].name).toBe('Test Team');
  });

  it('should create a new team', async () => {
    const { result } = renderHook(() => useTeamStore());

    const newTeamData: ITeamFormData = {
      name: 'New Team',
      description: 'This is a new team description',
      code: 'NEW',
      email: 'new@example.com',
      entity: 'Access Bank Nigeria',
      manager: 'Test Manager',
      status: ETeamStatus.ACTIVE,
    };

    await act(async () => {
      await result.current.createTeam(newTeamData);
    });

    expect(result.current.teams).toHaveLength(2);
    expect(result.current.teams[1].name).toBe('New Team');
    expect(result.current.teams[1].code).toBe('NEW');
  });

  it('should update an existing team', async () => {
    const { result } = renderHook(() => useTeamStore());

    const updateData: ITeamFormData = {
      name: 'Updated Team',
      description: 'This is an updated team description',
      code: 'UPD',
      email: 'updated@example.com',
      entity: 'Access Bank Nigeria',
      manager: 'Test Manager',
      status: ETeamStatus.INACTIVE,
    };

    await act(async () => {
      await result.current.updateTeam('team-001', updateData);
    });

    const updatedTeam = result.current.teams.find((team) => team.id === 'team-001');
    expect(updatedTeam?.name).toBe('Updated Team');
    expect(updatedTeam?.status).toBe(ETeamStatus.INACTIVE);
  });

  it('should delete a team', async () => {
    const { result } = renderHook(() => useTeamStore());

    expect(result.current.teams).toHaveLength(1);

    await act(async () => {
      await result.current.deleteTeam('team-001');
    });

    expect(result.current.teams).toHaveLength(0);
  });

  it('should get team by id', () => {
    const { result } = renderHook(() => useTeamStore());

    const team = result.current.getTeamById('team-001');
    expect(team).toBeDefined();
    expect(team?.name).toBe('Test Team');

    const nonExistentTeam = result.current.getTeamById('non-existent');
    expect(nonExistentTeam).toBeUndefined();
  });

  it('should handle validation errors', async () => {
    const { result } = renderHook(() => useTeamStore());

    const invalidTeamData: ITeamFormData = {
      name: '', // Invalid: empty name
      description: 'Valid description',
      code: 'AB', // Invalid: too short
      email: 'invalid-email', // Invalid: bad format
      entity: 'Access Bank Nigeria',
      manager: 'Test Manager',
      status: ETeamStatus.ACTIVE,
    };

    await act(async () => {
      try {
        await result.current.createTeam(invalidTeamData);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('Team name is required');
    expect(result.current.teams).toHaveLength(1); // Should not add invalid team
  });

  it('should clear error', () => {
    const { result } = renderHook(() => useTeamStore());

    // Set an error
    useTeamStore.setState({ error: 'Test error' });
    expect(result.current.error).toBe('Test error');

    // Clear the error
    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  it('should simulate loading state during operations', async () => {
    const { result } = renderHook(() => useTeamStore());

    const newTeamData: ITeamFormData = {
      name: 'Loading Test Team',
      description: 'This is a test team for loading state',
      code: 'LDT',
      email: 'loading@example.com',
      entity: 'Access Bank Nigeria',
      manager: 'Test Manager',
      status: ETeamStatus.ACTIVE,
    };

    // Start the operation
    const createPromise = act(async () => {
      await result.current.createTeam(newTeamData);
    });

    // Check loading state is true during operation
    expect(result.current.loading).toBe(true);

    // Wait for operation to complete
    await createPromise;

    // Check loading state is false after operation
    expect(result.current.loading).toBe(false);
  });
});
