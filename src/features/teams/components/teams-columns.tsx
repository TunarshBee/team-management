/**
 * Teams table column definitions for TanStack Table
 */

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { ITeam } from '@/types/global';
import { truncateText } from '@/lib/utils';

export const teamsColumns: ColumnDef<ITeam>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="text-background font-semibold hover:bg-bazara-blue/90 p-0 h-auto"
				>
					Team Name
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="font-medium text-foreground whitespace-nowrap">{row.getValue('name')}</div>
		),
	},
	{
		accessorKey: 'code',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="text-background font-semibold hover:bg-bazara-blue/90 p-0 h-auto"
				>
					Code
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="text-foreground whitespace-nowrap">{row.getValue('code')}</div>
		),
	},
	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => (
			<div className="text-foreground max-w-xs whitespace-nowrap overflow-hidden text-ellipsis">
				{truncateText(row.getValue('description'), 50)}
			</div>
		),
	},
	{
		accessorKey: 'email',
		header: 'Team Email',
		cell: ({ row }) => (
			<div className="text-foreground whitespace-nowrap">{row.getValue('email')}</div>
		),
	},
	{
		accessorKey: 'entity',
		header: 'Entity',
		cell: ({ row }) => (
			<div className="text-foreground whitespace-nowrap">{row.getValue('entity')}</div>
		),
	},
	{
		accessorKey: 'manager',
		header: 'Manager',
		cell: ({ row }) => {
			const manager = row.getValue('manager') as string;
			const initials = manager
				.split(' ')
				.map((name) => name[0])
				.join('')
				.toUpperCase();
			
			return (
				<div className="flex items-center space-x-3">
					<div className="w-8 h-8 bg-bazara-blue rounded-full flex items-center justify-center">
						<span className="text-background text-sm font-medium">{initials}</span>
					</div>
					<span className="text-foreground whitespace-nowrap">{manager}</span>
				</div>
			);
		},
	},
];
