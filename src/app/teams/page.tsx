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
    <div className='px-10 pb-10'>
      <div className='p-6 bg-background rounded-lg'>
        <h1 className='text-base font-bold leading-6 text-foreground pb-6 border-b border-[#EBEBEB] mb-6'>
          Teams
        </h1>

        <div className='flex items-center justify-between p-6'>
          <div className='flex items-center gap-4'>
            <SearchInput
              placeholder='Search by team name or code'
              value={searchValue}
              onChange={setSearchValue}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  className='border-[#299CCA] text-[#299CCA] hover:bg-bazara-blue-light h-10 px-4 flex items-center gap-2'
                >
                  <span>Entity: {selectedEntity}</span>
                  <ChevronDown className='w-4 h-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className='w-56'>
                <DropdownMenuLabel>Select Entity</DropdownMenuLabel>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => setSelectedEntity('All Entities')}
                >
                  All Entities
                </DropdownMenuItem>
                {ENTITY_OPTIONS.map((entity) => (
                  <DropdownMenuItem
                    key={entity.value}
                    className='cursor-pointer'
                    onClick={() => setSelectedEntity(entity.label)}
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
                  className='border-bazara-blue-light text-[#299CCA] hover:bg-bazara-blue-light h-10 px-4 flex items-center gap-2'
                >
                  <span>More Filters</span>
                  <ChevronDown className='w-4 h-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className='w-48'>
                <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                {STATUS_FILTER_OPTIONS.map((status) => (
                  <DropdownMenuItem
                    key={status.value}
                    className='cursor-pointer'
                    onClick={() => {}}
                  >
                    {status.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className='bg-bazara-blue hover:bg-bazara-blue/90 text-background h-10 px-4 flex items-center gap-2 place-self-end'
          >
            <Plus className='w-4 h-4' />
            <span>Create New Team</span>
          </Button>
        </div>

        <TeamsTable
          teams={teams}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreateTeam={() => setIsCreateModalOpen(true)}
        />
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
