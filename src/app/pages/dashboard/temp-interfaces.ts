export type ElectionType = 'general' | 'by-election' | 'council-rep';

export interface ElectionModel {
  slug: string;
  name: string;
  type: ElectionType;
  datetime_start_nominations: string;
  datetime_start_voting: string;
  datetime_end_voting: string;
  available_positions: string;
  survey_link?: string;
}

export const ELECTIONS: ElectionModel[] = [
  {
    slug: 'test-election-1',
    name: 'test election   1',
    type: 'general',
    datetime_start_nominations: '2024-07-21 23:19:07.781',
    datetime_start_voting: '2024-07-26 19:19:07.781',
    datetime_end_voting: '2024-07-31 15:19:07.781',
    available_positions: 'president,vice-president,treasurer',
    survey_link: 'https://youtu.be/dQw4w9WgXcQ?si=kZROi2tu-43MXPM5'
  },
  {
    slug: 'test-election-2',
    name: 'test election 2',
    type: 'by-election',
    datetime_start_nominations: '2025-08-24 23:19:07.784',
    datetime_start_voting: '2025-09-01 23:19:07.784',
    datetime_end_voting: '2025-09-08 23:19:07.784',
    available_positions: 'president,vice-president,treasurer',
    survey_link: 'https://youtu.be/dQw4w9WgXcQ?si=kZROi2tu-43MXPM5'
  },
  {
    slug: 'my-cr-election-3',
    name: 'my cr election 3',
    type: 'council-rep',
    datetime_start_nominations: '2025-08-20 23:19:07.784',
    datetime_start_voting: '2025-08-24 19:19:07.784',
    datetime_end_voting: '2025-08-31 07:19:07.784',
    available_positions: 'president,vice-president,treasurer',
    survey_link: 'https://youtu.be/dQw4w9WgXcQ?si=kZROi2tu-43MXPM5'
  },
  {
    slug: 'THE-SUPER-GENERAL-ELECTION-friends',
    name: 'THE SUPER GENERAL ELECTION & friends',
    type: 'council-rep',
    datetime_start_nominations: '2025-08-20 23:19:07.784',
    datetime_start_voting: '2025-09-05 03:19:07.784',
    datetime_end_voting: '2025-09-10 07:19:07.784',
    available_positions: 'president,vice-president,treasurer'
  }
];
