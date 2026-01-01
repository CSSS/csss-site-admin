import { OfficerPositionEnum } from '@api/backend-api';

export const officerLabels: Record<OfficerPositionEnum, string> = {
  president: 'President',
  'vice-president': 'Vice-President',
  treasurer: 'Treasurer',
  'director of resources': 'Director of Resources',
  'director of events': 'Director of Events',
  'director of educational events': 'Director of Educational Events',
  'assistant director of events': 'Assistant Director of Events',
  'director of communications': 'Director of Communications',
  'director of multimedia': 'Director of Multimedia',
  'director of archives': 'Director of Archives',
  'sfss council representative': 'SFSS Council Representative',
  'executive at large': 'Executive at Large',
  'first year representative': 'First Year Representative',
  'election officer': 'Election Officer',
  'frosh week chair': 'Frosh Week Chair',
  'system administrator': 'System Administrator',
  webmaster: 'Webmaster',
  'social media manager': 'Social Media Manager'
} as const;

export type OfficerType = keyof typeof officerLabels;
