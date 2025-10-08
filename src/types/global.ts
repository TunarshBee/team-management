export interface ITeam {
  id: string;
  name: string;
  description: string;
  code: string;
  email: string;
  entity: string;
  manager: string;
  status: ETeamStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum ETeamStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export interface ITeamFormData {
  name: string;
  description: string;
  code: string;
  email: string;
  entity: string;
  manager: string;
  status: ETeamStatus;
}

export interface ITeamStore {
  teams: ITeam[];
  loading: boolean;
  error: string | null;

  createTeam: (teamData: ITeamFormData) => Promise<void>;
  updateTeam: (id: string, teamData: ITeamFormData) => Promise<void>;
  deleteTeam: (id: string) => Promise<void>;
  getTeamById: (id: string) => ITeam | undefined;

  clearError: () => void;
}

export interface ITeamsTableProps {
  teams: ITeam[];
  loading: boolean;
  onEdit: (team: ITeam) => void;
  onDelete: (team: ITeam) => void;
}

export interface ITeamFormProps {
  team?: ITeam;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ITeamFormData) => Promise<void>;
  loading: boolean;
}

export interface ITableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface ISortConfig {
  key: keyof ITeam;
  direction: 'asc' | 'desc';
}

export interface IFilterConfig {
  search: string;
  status: ETeamStatus | 'All';
  entity: string;
}

export interface IPaginationConfig {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export type TEntityOption = {
  value: string;
  label: string;
};

export type TManagerOption = {
  value: string;
  label: string;
};

export interface IApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface IFormFieldError {
  field: string;
  message: string;
}

export interface IFormState {
  isSubmitting: boolean;
  errors: IFormFieldError[];
  isValid: boolean;
}

export type TSortDirection = 'asc' | 'desc';
export type TPageSize = 10 | 20;
export type TModalType = 'create' | 'edit' | 'delete' | 'confirm';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
}

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export interface ISelectProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
}

export interface IDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface IConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}
