/**
 * Zustand store for Team Management
 * Provides CRUD operations with simulated API delays
 */

import * as React from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ITeam, ITeamFormData, ITeamStore, ETeamStatus } from '@/types/global';
import { mockTeams } from '@/data/teams';

// Simulate API delay
const simulateApiDelay = (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 500));
};

// Generate unique ID
const generateId = (): string => {
  return `team-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Validate team data
const validateTeamData = (data: ITeamFormData): string | null => {
  if (!data.name.trim()) return 'Team name is required';
  if (!data.description.trim()) return 'Description is required';
  if (!data.code.trim()) return 'Team code is required';
  if (data.code.length < 3 || data.code.length > 5) return 'Code must be 3-5 characters';
  if (!data.email.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'Invalid email format';
  if (!data.entity.trim()) return 'Entity is required';
  if (!data.manager.trim()) return 'Manager is required';
  if (!Object.values(ETeamStatus).includes(data.status)) return 'Invalid status';
  return null;
};

export const useTeamStore = create<ITeamStore>()(
  devtools(
    (set, get) => ({
      teams: mockTeams,
      loading: false,
      error: null,

      createTeam: async (teamData: ITeamFormData) => {
        const validationError = validateTeamData(teamData);
        if (validationError) {
          set({ error: validationError });
          throw new Error(validationError);
        }

        set({ loading: true, error: null });

        try {
          await simulateApiDelay();

          const newTeam: ITeam = {
            id: generateId(),
            ...teamData,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          set((state) => ({
            teams: [...state.teams, newTeam],
            loading: false,
          }));
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to create team',
          });
          throw error;
        }
      },

      updateTeam: async (id: string, teamData: ITeamFormData) => {
        const validationError = validateTeamData(teamData);
        if (validationError) {
          set({ error: validationError });
          throw new Error(validationError);
        }

        set({ loading: true, error: null });

        try {
          await simulateApiDelay();

          const existingTeam = get().teams.find((team) => team.id === id);
          if (!existingTeam) {
            throw new Error('Team not found');
          }

          const updatedTeam: ITeam = {
            ...existingTeam,
            ...teamData,
            updatedAt: new Date(),
          };

          set((state) => ({
            teams: state.teams.map((team) => (team.id === id ? updatedTeam : team)),
            loading: false,
          }));
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to update team',
          });
          throw error;
        }
      },

      deleteTeam: async (id: string) => {
        set({ loading: true, error: null });

        try {
          await simulateApiDelay();

          const teamExists = get().teams.some((team) => team.id === id);
          if (!teamExists) {
            throw new Error('Team not found');
          }

          set((state) => ({
            teams: state.teams.filter((team) => team.id !== id),
            loading: false,
          }));
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to delete team',
          });
          throw error;
        }
      },

      getTeamById: (id: string) => {
        return get().teams.find((team) => team.id === id);
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'team-store',
    }
  )
);

// Selectors for optimized re-renders
export const useTeams = () => useTeamStore((state) => state.teams);
export const useTeamLoading = () => useTeamStore((state) => state.loading);
export const useTeamError = () => useTeamStore((state) => state.error);
export const useTeamActions = () =>
  useTeamStore((state) => ({
    createTeam: state.createTeam,
    updateTeam: state.updateTeam,
    deleteTeam: state.deleteTeam,
    getTeamById: state.getTeamById,
    clearError: state.clearError,
  }));

// Utility selectors
export const useActiveTeams = () => {
  const teams = useTeamStore((state) => state.teams);
  return React.useMemo(() => teams.filter((team) => team.status === ETeamStatus.ACTIVE), [teams]);
};

export const useTeamsByEntity = (entity: string) => {
  const teams = useTeamStore((state) => state.teams);
  return React.useMemo(() => teams.filter((team) => team.entity === entity), [teams, entity]);
};

export const useTeamsByManager = (manager: string) => {
  const teams = useTeamStore((state) => state.teams);
  return React.useMemo(() => teams.filter((team) => team.manager === manager), [teams, manager]);
};

// Search and filter utilities
export const useFilteredTeams = (
  searchTerm: string,
  statusFilter: string,
  entityFilter: string
) => {
  const teams = useTeamStore((state) => state.teams);

  return React.useMemo(() => {
    let filtered = teams;

    // Text search (name or code)
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (team) =>
          team.name.toLowerCase().includes(search) || team.code.toLowerCase().includes(search)
      );
    }

    // Status filter
    if (statusFilter && statusFilter !== 'All') {
      filtered = filtered.filter((team) => team.status === statusFilter);
    }

    // Entity filter
    if (entityFilter && entityFilter !== 'All') {
      filtered = filtered.filter((team) => team.entity === entityFilter);
    }

    return filtered;
  }, [teams, searchTerm, statusFilter, entityFilter]);
};

// Pagination utilities
export const usePaginatedTeams = (teams: ITeam[], page: number, pageSize: number) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    paginatedTeams: teams.slice(startIndex, endIndex),
    totalPages: Math.ceil(teams.length / pageSize),
    totalItems: teams.length,
    hasNextPage: endIndex < teams.length,
    hasPreviousPage: page > 1,
  };
};
