export type DivisionName = 'Division 1' | 'Division 2'

export interface Divisions {
  [key: string]: string[]
}

export interface MatchSet {
  A: number
  B: number
}

export type MatchStatus = 'completed' | 'scheduled'

export interface MatchStats {
  durationMinutes?: number
  umpire?: string
  notes?: string
}

export interface Match {
  id: string
  division: DivisionName | string
  playerA: string
  playerB: string
  date?: string
  time?: string
  venue?: string
  status: MatchStatus
  sets: MatchSet[]
  stats?: MatchStats
}

export interface ClubData {
  clubName: string
  divisions: Divisions
  matches: Match[]
}

export interface PlayerRow {
  rank?: number
  name: string
  played: number
  wins: number
  losses: number
  setsFor: number
  setsAgainst: number
  setsDiff?: number
  points: number
}