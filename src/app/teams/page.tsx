'use client';

import { entityOptions, managerOptions } from '@/data/teams';
import TeamForm from '@/features/teams/components/TeamForm';
import TeamsTable from '@/features/teams/components/TeamsTable';
import { Button } from '@/shared/components/ui/button';
import ConfirmDialog from '@/shared/components/ui/confirm-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { SearchInput } from '@/shared/components/ui/search-input';
import SuccessDialog from '@/shared/components/ui/success-dialog';
import { ENTITY_OPTIONS, STATUS_FILTER_OPTIONS } from '@/shared/constants/navigation';
import { useTeamStore } from '@/stores/teamStore';
import { ITeam, ITeamFormData } from '@/types/global';
import { ChevronDown, Plus } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

const TeamsPage: React.FC = () => {
  const { teams, loading, createTeam, updateTeam, deleteTeam, clearError } = useTeamStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<ITeam | null>(null);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [selectedEntity, setSelectedEntity] = React.useState('All Entities');
  const [searchValue, setSearchValue] = React.useState('');

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsSuccessModalOpen(false);
    setSelectedTeam(null);
    clearError();
  };

  const handleCreateTeam = async (data: ITeamFormData) => {
    try {
      await createTeam(data);
      setSuccessMessage('Team created successfully!');
      setIsCreateModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Failed to create team:', error);
    }
  };

  const handleUpdateTeam = async (data: ITeamFormData) => {
    if (!selectedTeam) return;

    try {
      await updateTeam(selectedTeam.id, data);
      setSuccessMessage('Team updated successfully!');
      setIsEditModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Failed to update team:', error);
    }
  };

  const handleDeleteTeam = async () => {
    if (!selectedTeam) return;

    try {
      await deleteTeam(selectedTeam.id);
      setSuccessMessage('Team deleted successfully!');
      setIsDeleteModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Failed to delete team:', error);
    }
  };

  const handleEdit = (team: ITeam) => {
    setSelectedTeam(team);
    setIsEditModalOpen(true);
  };

  const handleDelete = (team: ITeam) => {
    setSelectedTeam(team);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className='px-4 sm:px-6 lg:px-10 pb-10'>
      <div className='p-4 sm:p-6 bg-background rounded-lg'>
        <h1 className='text-base font-bold leading-6 text-foreground pb-6 border-b border-[#EBEBEB] mb-6'>
          Teams
        </h1>

        <div
          className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 sm:p-6 sm:pt-4'
          role='toolbar'
          aria-label='Team management controls'
        >
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto'>
            <SearchInput
              placeholder='Search by team name or code'
              value={searchValue}
              onChange={setSearchValue}
              ariaLabel='Search teams by name or code'
              id='teams-search'
              className='w-full sm:w-auto'
            />

            <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    className='border-[#299CCA] text-[#299CCA] hover:bg-bazara-blue-light h-10 px-4 flex items-center gap-2 w-full sm:w-auto justify-between'
                    aria-label={`Filter by entity: ${selectedEntity}`}
                    aria-haspopup='listbox'
                  >
                    <span className='truncate'>Entity: {selectedEntity}</span>
                    <ChevronDown className='w-4 h-4 flex-shrink-0' aria-hidden='true' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' className='w-48' role='listbox'>
                  <DropdownMenuLabel>Select Entity</DropdownMenuLabel>
                  <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() => setSelectedEntity('All Entities')}
                    role='option'
                    aria-selected={selectedEntity === 'All Entities'}
                  >
                    All Entities
                  </DropdownMenuItem>
                  {ENTITY_OPTIONS.map((entity) => (
                    <DropdownMenuItem
                      key={entity.value}
                      className='cursor-pointer'
                      onClick={() => setSelectedEntity(entity.label)}
                      role='option'
                      aria-selected={entity.label === selectedEntity}
                    >
                      {entity.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    className='border-bazara-blue-light text-[#299CCA] hover:bg-bazara-blue-light h-10 px-4 flex items-center gap-2 w-full sm:w-auto justify-between'
                    aria-label='More filter options'
                    aria-haspopup='listbox'
                  >
                    <span>More Filters</span>
                    <ChevronDown className='w-4 h-4 flex-shrink-0' aria-hidden='true' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' className='w-48' role='listbox'>
                  <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                  {STATUS_FILTER_OPTIONS.map((status) => (
                    <DropdownMenuItem
                      key={status.value}
                      className='cursor-pointer'
                      onClick={() => {}}
                      role='option'
                    >
                      {status.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Button
            className='bg-bazara-blue hover:bg-bazara-blue/90 text-background h-10 px-4 flex items-center gap-2 w-full sm:w-auto justify-center lg:justify-start'
            onClick={() => setIsCreateModalOpen(true)}
            aria-label='Create new team'
          >
            <Plus className='w-4 h-4' aria-hidden='true' />
            <span className='hidden sm:inline'>Create New Team</span>
            <span className='sm:hidden'>Create Team</span>
          </Button>
        </div>

        <section aria-label='Teams table' role='region'>
          <TeamsTable
            teams={teams}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreateTeam={() => setIsCreateModalOpen(true)}
          />
        </section>
        <Button variant='ghost' size='icon'>
          <Image
            src='/icons/ai-icon.svg'
            alt='Ai Icon'
            width={40}
            height={40}
            className='fixed bottom-10 right-10'
          />
        </Button>
      </div>

      <TeamForm
        isOpen={isCreateModalOpen}
        onClose={closeModals}
        onSubmit={handleCreateTeam}
        loading={loading}
        entityOptions={entityOptions}
        managerOptions={managerOptions}
      />

      <TeamForm
        isOpen={isEditModalOpen}
        onClose={closeModals}
        onSubmit={handleUpdateTeam}
        loading={loading}
        entityOptions={entityOptions}
        managerOptions={managerOptions}
        team={selectedTeam || undefined}
      />

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onConfirm={handleDeleteTeam}
        title='Delete Team'
        message={`Are you sure you want to delete "${selectedTeam?.name}"? This action cannot be undone.`}
        confirmText='Delete'
        cancelText='Cancel'
        variant='destructive'
      />

      <SuccessDialog
        isOpen={isSuccessModalOpen}
        onClose={closeModals}
        title='Success'
        message={successMessage}
      />
    </div>
  );
};

export default TeamsPage;
