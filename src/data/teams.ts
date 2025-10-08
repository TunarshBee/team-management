/**
 * Mock data for Team Management application
 * Contains 500+ realistic team objects with diverse data
 */

import { ITeam, ETeamStatus } from '@/types/global';

// Entity options for realistic data
const entities = [
  'Access Bank Nigeria',
  'Access Bank Angola',
  'Access Bank Ghana',
  'Access Bank Kenya',
  'Access Bank Rwanda',
  'Access Bank Zambia',
  'Access Bank Sierra Leone',
  'Access Bank Gambia',
  'Access Bank Mozambique',
  'Access Bank Democratic Republic of Congo',
  'Access Bank Cameroon',
  'Access Bank Uganda',
  'Access Bank Tanzania',
  'Access Bank Malawi',
  'Access Bank Botswana',
  'Access Bank South Africa',
  'Access Bank Mauritius',
  'Access Bank Seychelles',
  'Access Bank United Kingdom',
  'Access Bank United Arab Emirates',
];

// Manager names for realistic data
const managers = [
  'Joshua Gladness',
  'Sarah Johnson',
  'Michael Chen',
  'Emily Rodriguez',
  'David Thompson',
  'Lisa Wang',
  'James Anderson',
  'Maria Garcia',
  'Robert Brown',
  'Jennifer Davis',
  'Christopher Wilson',
  'Amanda Taylor',
  'Daniel Martinez',
  'Jessica Lee',
  'Matthew White',
  'Ashley Harris',
  'Andrew Clark',
  'Samantha Lewis',
  'Kevin Walker',
  'Nicole Hall',
  'Ryan Young',
  'Stephanie King',
  'Brandon Wright',
  'Rachel Lopez',
  'Tyler Hill',
  'Lauren Green',
  'Jordan Adams',
  'Brittany Nelson',
  'Cameron Baker',
  'Megan Carter',
];

// Team name templates for variety
const teamNameTemplates = [
  'IT Support',
  'Change Management',
  'Incident Management',
  'Service Request Management',
  'Problem Management',
  'Configuration Management',
  'Release Management',
  'Service Level Management',
  'Capacity Management',
  'Availability Management',
  'IT Service Continuity',
  'Information Security',
  'Financial Management',
  'Supplier Management',
  'Knowledge Management',
  'Customer Service',
  'Technical Support',
  'Network Operations',
  'Database Administration',
  'System Administration',
  'Security Operations',
  'Compliance Team',
  'Risk Management',
  'Quality Assurance',
  'Testing Team',
  'Development Team',
  'DevOps Team',
  'Cloud Operations',
  'Infrastructure Team',
  'Application Support',
  'Business Analysis',
  'Project Management',
  'Training Team',
  'Documentation Team',
  'Monitoring Team',
  'Backup Team',
  'Disaster Recovery',
  'Vendor Management',
  'Asset Management',
  'License Management',
];

// Code prefixes for team codes
const codePrefixes = [
  'IT',
  'CM',
  'IM',
  'SR',
  'PM',
  'CF',
  'RM',
  'SL',
  'CP',
  'AV',
  'SC',
  'IS',
  'FM',
  'SM',
  'KM',
  'CS',
  'TS',
  'NO',
  'DA',
  'SA',
  'SO',
  'CT',
  'RM',
  'QA',
  'TT',
  'DT',
  'DO',
  'CO',
  'IF',
  'AS',
  'BA',
  'PM',
  'TR',
  'DC',
  'MT',
  'BT',
  'DR',
  'VM',
  'AM',
  'LM',
];

// Generate realistic team codes
const generateTeamCode = (index: number): string => {
  const prefix = codePrefixes[index % codePrefixes.length];
  const suffix = String(index + 1).padStart(2, '0');
  return `${prefix}${suffix}`;
};

// Generate realistic email addresses
const generateTeamEmail = (code: string, entity: string): string => {
  const entityCode = entity.toLowerCase().replace(/\s+/g, '');
  return `${code.toLowerCase()}@${entityCode}.com`;
};

// Generate team descriptions (deterministic based on name hash)
const generateDescription = (name: string): string => {
  const descriptions = [
    `Manages ${name.toLowerCase()} operations and ensures service delivery excellence.`,
    `Responsible for ${name.toLowerCase()} processes and continuous improvement initiatives.`,
    `Handles ${name.toLowerCase()} activities and maintains operational standards.`,
    `Oversees ${name.toLowerCase()} functions and drives organizational efficiency.`,
    `Coordinates ${name.toLowerCase()} efforts and ensures compliance with policies.`,
    `Supports ${name.toLowerCase()} initiatives and maintains service quality.`,
    `Leads ${name.toLowerCase()} operations and implements best practices.`,
    `Manages ${name.toLowerCase()} resources and optimizes performance metrics.`,
    `Executes ${name.toLowerCase()} strategies and delivers business value.`,
    `Administers ${name.toLowerCase()} systems and ensures reliability.`,
  ];

  // Use deterministic hash instead of Math.random()
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  const index = Math.abs(hash) % descriptions.length;
  return descriptions[index];
};

// Generate a single team object
const generateTeam = (index: number): ITeam => {
  const nameTemplate = teamNameTemplates[index % teamNameTemplates.length];
  const teamName = `${nameTemplate} Team ${Math.floor(index / teamNameTemplates.length) + 1}`;
  const code = generateTeamCode(index);
  const entity = entities[index % entities.length];
  const manager = managers[index % managers.length];

  // Use deterministic status based on index instead of Math.random()
  const status = index % 10 === 0 ? ETeamStatus.INACTIVE : ETeamStatus.ACTIVE;

  // Use deterministic dates based on index instead of Math.random()
  const baseDate = new Date('2023-01-01');
  const createdAt = new Date(baseDate.getTime() + index * 24 * 60 * 60 * 1000); // Each team created 1 day apart
  const updatedAt = new Date(createdAt.getTime() + (index % 30) * 24 * 60 * 60 * 1000); // Updated within 30 days

  return {
    id: `team-${String(index + 1).padStart(3, '0')}`,
    name: teamName,
    description: generateDescription(teamName),
    code,
    email: generateTeamEmail(code, entity),
    entity,
    manager,
    status,
    createdAt,
    updatedAt,
  };
};

// Generate 500+ teams
export const mockTeams: ITeam[] = Array.from({ length: 520 }, (_, index) => generateTeam(index));

// Additional utility data
export const entityOptions = entities.map((entity) => ({
  value: entity,
  label: entity,
}));

export const managerOptions = managers.map((manager) => ({
  value: manager,
  label: manager,
}));

export const statusOptions = [
  { value: ETeamStatus.ACTIVE, label: ETeamStatus.ACTIVE },
  { value: ETeamStatus.INACTIVE, label: ETeamStatus.INACTIVE },
];

// Statistics for testing
export const teamStats = {
  total: mockTeams.length,
  active: mockTeams.filter((team) => team.status === ETeamStatus.ACTIVE).length,
  inactive: mockTeams.filter((team) => team.status === ETeamStatus.INACTIVE).length,
  entities: new Set(mockTeams.map((team) => team.entity)).size,
  managers: new Set(mockTeams.map((team) => team.manager)).size,
};
