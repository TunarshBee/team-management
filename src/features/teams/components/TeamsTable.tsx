/**
 * TeamsTable component using TanStack Table
 * Features: Sorting, filtering, pagination, row selection, actions
 */

import { DataTable } from '@/shared/components/ui/data-table';
import { ITeam } from '@/types/global';
import { Plus } from 'lucide-react';
import * as React from 'react';
import { teamsColumns } from './teams-columns';

export interface ITeamsTableProps {
  teams: ITeam[];
  onEdit: (team: ITeam) => void;
  onDelete: (team: ITeam) => void;
  onCreateTeam: () => void;
}

const TeamsTable: React.FC<ITeamsTableProps> = ({ teams, onEdit, onDelete, onCreateTeam }) => {
  const handleRowAction = (action: string, team: ITeam) => {
    switch (action) {
      case 'edit':
        onEdit(team);
        break;
      case 'delete':
        onDelete(team);
        break;
      default:
        break;
    }
  };

  const actionItems = [
    {
      label: 'Edit Team',
      value: 'edit',
      variant: 'default' as const,
    },
    {
      label: 'Delete Team',
      value: 'delete',
      variant: 'destructive' as const,
    },
  ];

  return (
    <div className='space-y-0'>
      {/* Data Table */}
      <DataTable
        columns={teamsColumns}
        data={teams}
        searchKey='name'
        searchPlaceholder='Search by team name or code'
        onRowAction={handleRowAction}
        actionItems={actionItems}
        enableRowSelection={true}
        enableColumnVisibility={false}
        enableSorting={true}
        enableFiltering={true}
        enablePagination={true}
        pageSize={20}
        pageSizeOptions={[10, 20, 50, 100]}
        createButton={{
          label: 'Create New Team',
          onClick: onCreateTeam,
          icon: <Plus className='w-4 h-4' />,
        }}
      />
    </div>
  );
};

export default TeamsTable;
