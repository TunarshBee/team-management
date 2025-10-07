import { renderHook, act } from '@testing-library/react';
import { useTeamStore } from '@/stores/teamStore';
import { ETeamStatus, ETeamEntity } from '@/types/global';

// Mock the teams data
jest.mock('@/data/teams', () => ({
  mockTeams: [
    {
      id: '1',
      name: 'Test Team',
      description: 'Test Description',
      code: 'TEST',
      email: 'test@example.com',
      entity: ETeamEntity.ACCESS_BANK_NIGERIA,
      manager: { id: '1', name: 'Test Manager', email: 'manager@example.com' },
      status: ETeamStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  managers: [
    { id: '1', name: 'Test Manager', email: 'manager@example.com' },
  ],
}));

describe('Team Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useTeamStore.setState({
      teams: [],
      isLoading: false,
      error: null,
    });
  });

  it('should fetch teams successfully', async () => {
    const { result } = renderHook(() => useTeamStore());

    await act(async () => {
      await result.current.fetchTeams();
    });

    expect(result.current.teams).toHaveLength(1);
    expect(result.current.teams[0].name).toBe('Test Team');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should create a new team', async () => {
    const { result } = renderHook(() => useTeamStore());

    // First fetch teams
    await act(async () => {
      await result.current.fetchTeams();
    });

    const newTeamData = {
      name: 'New Team',
      description: 'New Description',
      code: 'NEW',
      email: 'new@example.com',
      entity: ETeamEntity.ACCESS_BANK_NIGERIA,
      managerId: '1',
      status: ETeamStatus.ACTIVE,
    };

    let createdTeam;
    await act(async () => {
      createdTeam = await result.current.createTeam(newTeamData);
    });

    expect(createdTeam).toBeDefined();
    expect(createdTeam?.name).toBe('New Team');
    expect(result.current.teams).toHaveLength(2);
  });

  it('should update an existing team', async () => {
    const { result } = renderHook(() => useTeamStore());

    // First fetch teams
    await act(async () => {
      await result.current.fetchTeams();
    });

    const updateData = {
      name: 'Updated Team',
      description: 'Updated Description',
      code: 'UPD',
      email: 'updated@example.com',
      entity: ETeamEntity.ACCESS_BANK_NIGERIA,
      managerId: '1',
      status: ETeamStatus.INACTIVE,
    };

    let updatedTeam;
    await act(async () => {
      updatedTeam = await result.current.updateTeam('1', updateData);
    });

    expect(updatedTeam).toBeDefined();
    expect(updatedTeam?.name).toBe('Updated Team');
    expect(updatedTeam?.status).toBe(ETeamStatus.INACTIVE);
  });

  it('should delete a team', async () => {
    const { result } = renderHook(() => useTeamStore());

    // First fetch teams
    await act(async () => {
      await result.current.fetchTeams();
    });

    expect(result.current.teams).toHaveLength(1);

    await act(async () => {
      await result.current.deleteTeam('1');
    });

    expect(result.current.teams).toHaveLength(0);
  });

  it('should handle errors gracefully', async () => {
    const { result } = renderHook(() => useTeamStore());

    // Mock a failing operation
    const originalCreateTeam = result.current.createTeam;
    result.current.createTeam = jest.fn().mockRejectedValue(new Error('API Error'));

    await act(async () => {
      try {
        await result.current.createTeam({
          name: 'Test',
          description: 'Test',
          code: 'TST',
          email: 'test@test.com',
          entity: ETeamEntity.ACCESS_BANK_NIGERIA,
          managerId: '1',
          status: ETeamStatus.ACTIVE,
        });
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('API Error');
    expect(result.current.isLoading).toBe(false);
  });
});
