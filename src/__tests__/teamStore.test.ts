import { useTeamStore } from '@/stores/teamStore';
import { ETeamStatus, ITeamFormData } from '@/types/global';
import { act, renderHook } from '@testing-library/react';

describe('Team Store', () => {
  beforeEach(() => {
    useTeamStore.setState({ teams: [], loading: false, error: null });
  });

  it('should initialize with empty teams array', () => {
    const { result } = renderHook(() => useTeamStore());
    expect(result.current.teams).toHaveLength(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should create a team', async () => {
    const { result } = renderHook(() => useTeamStore());

    const newTeam: ITeamFormData = {
      name: 'Test Team',
      description: 'This is a test team description',
      code: 'TEST',
      email: 'test@example.com',
      entity: 'Access Bank Nigeria',
      manager: 'Test Manager',
      status: ETeamStatus.ACTIVE,
    };

    await act(async () => {
      await result.current.createTeam(newTeam);
    });

    expect(result.current.teams).toHaveLength(1);
    expect(result.current.teams[0].name).toBe('Test Team');
  });

  it('should update a team', async () => {
    const { result } = renderHook(() => useTeamStore());

    const newTeam: ITeamFormData = {
      name: 'Test Team',
      description: 'This is a test team description',
      code: 'TEST',
      email: 'test@example.com',
      entity: 'Access Bank Nigeria',
      manager: 'Test Manager',
      status: ETeamStatus.ACTIVE,
    };

    await act(async () => {
      await result.current.createTeam(newTeam);
    });

    const teamId = result.current.teams[0].id;
    const updatedData: ITeamFormData = {
      ...newTeam,
      name: 'Updated Team',
    };

    await act(async () => {
      await result.current.updateTeam(teamId, updatedData);
    });

    expect(result.current.teams[0].name).toBe('Updated Team');
  });

  it('should delete a team', async () => {
    const { result } = renderHook(() => useTeamStore());

    const newTeam: ITeamFormData = {
      name: 'Test Team',
      description: 'This is a test team description',
      code: 'TEST',
      email: 'test@example.com',
      entity: 'Access Bank Nigeria',
      manager: 'Test Manager',
      status: ETeamStatus.ACTIVE,
    };

    await act(async () => {
      await result.current.createTeam(newTeam);
    });

    const teamId = result.current.teams[0].id;

    await act(async () => {
      await result.current.deleteTeam(teamId);
    });

    expect(result.current.teams).toHaveLength(0);
  });

  it('should get team by id', async () => {
    const { result } = renderHook(() => useTeamStore());

    const newTeam: ITeamFormData = {
      name: 'Test Team',
      description: 'This is a test team description',
      code: 'TEST',
      email: 'test@example.com',
      entity: 'Access Bank Nigeria',
      manager: 'Test Manager',
      status: ETeamStatus.ACTIVE,
    };

    await act(async () => {
      await result.current.createTeam(newTeam);
    });

    const teamId = result.current.teams[0].id;
    const team = result.current.getTeamById(teamId);

    expect(team).toBeDefined();
    expect(team?.name).toBe('Test Team');
  });

  it('should handle loading state', async () => {
    const { result } = renderHook(() => useTeamStore());

    const newTeam: ITeamFormData = {
      name: 'Test Team',
      description: 'This is a test team description',
      code: 'TEST',
      email: 'test@example.com',
      entity: 'Access Bank Nigeria',
      manager: 'Test Manager',
      status: ETeamStatus.ACTIVE,
    };

    act(() => {
      result.current.createTeam(newTeam);
    });

    expect(result.current.loading).toBe(true);
  });
});
