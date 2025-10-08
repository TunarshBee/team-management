export interface INavigationItem {
  id: string;
  label: string;
  href?: string;
  isActive?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface IEntityOption {
  value: string;
  label: string;
}

export interface IManagerOption {
  value: string;
  label: string;
}

export const PRIMARY_NAV_ITEMS: INavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    isActive: true,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
  },
  {
    id: 'reports',
    label: 'Reports',
    href: '/reports',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
  },
];

export const SECONDARY_NAV_ITEMS: INavigationItem[] = [
  {
    id: 'admin-settings',
    label: 'Admin Settings',
    href: '/admin/settings',
  },
];
export const BREADCRUMB_ITEMS: INavigationItem[] = [
  {
    id: 'admin-settings',
    label: 'Admin Settings',
    href: '/admin/settings',
  },
  {
    id: 'teams',
    label: 'Teams',
    href: '/teams',
    isActive: true,
  },
];

export const ENTITY_OPTIONS: IEntityOption[] = [
  { value: 'all', label: 'All Entities' },
  { value: 'access-bank-nigeria', label: 'Access Bank Nigeria' },
  { value: 'access-bank-ghana', label: 'Access Bank Ghana' },
  { value: 'access-bank-south-africa', label: 'Access Bank South Africa' },
  { value: 'access-bank-uk', label: 'Access Bank UK' },
];

export const MANAGER_OPTIONS: IManagerOption[] = [
  { value: 'john-doe', label: 'John Doe' },
  { value: 'jane-smith', label: 'Jane Smith' },
  { value: 'mike-johnson', label: 'Mike Johnson' },
  { value: 'sarah-wilson', label: 'Sarah Wilson' },
  { value: 'david-brown', label: 'David Brown' },
  { value: 'lisa-davis', label: 'Lisa Davis' },
  { value: 'robert-miller', label: 'Robert Miller' },
  { value: 'emily-garcia', label: 'Emily Garcia' },
];

export const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active Only' },
  { value: 'inactive', label: 'Inactive Only' },
] as const;

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export const COLUMN_VISIBILITY_OPTIONS = [
  { key: 'name', label: 'Team Name' },
  { key: 'code', label: 'Code' },
  { key: 'description', label: 'Description' },
  { key: 'email', label: 'Team Email' },
  { key: 'entity', label: 'Entity' },
  { key: 'manager', label: 'Manager' },
] as const;
