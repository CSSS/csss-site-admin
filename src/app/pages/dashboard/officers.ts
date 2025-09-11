export const officerLabels = {
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
  'sfss council representative': 'SFSS Council Representative'
} as const;

export type OfficerType = keyof typeof officerLabels;
