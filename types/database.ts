export type UserRole = 'admin' | 'organizer' | 'judge' | 'viewer'
export type CompetitionStatus =
  | 'draft'
  | 'published'
  | 'active'
  | 'completed'
  | 'archived'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      competitions: {
        Row: {
          id: string
          name: string
          season: string
          status: CompetitionStatus
          start_date: string | null
          end_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          season: string
          status?: CompetitionStatus
          start_date?: string | null
          end_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          season?: string
          status?: CompetitionStatus
          start_date?: string | null
          end_date?: string | null
          created_at?: string
        }
        Relationships: []
      }
      teams: {
        Row: {
          id: string
          competition_id: string
          team_name: string
          school_name: string
          category: string
          table_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          competition_id: string
          team_name: string
          school_name: string
          category: string
          table_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          competition_id?: string
          team_name?: string
          school_name?: string
          category?: string
          table_name?: string | null
          created_at?: string
        }
        Relationships: []
      }
      judges: {
        Row: {
          id: string
          user_id: string | null
          name: string
          email: string
          role: UserRole
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          email: string
          role?: UserRole
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          email?: string
          role?: UserRole
          created_at?: string
        }
        Relationships: []
      }
      scores: {
        Row: {
          id: string
          team_id: string
          judge_id: string
          score_technical: number
          score_creativity: number
          score_performance: number
          score_penalty: number
          total_score: number
          created_at: string
          updated_at: string
          submitted_at: string | null
        }
        Insert: {
          id?: string
          team_id: string
          judge_id: string
          score_technical?: number
          score_creativity?: number
          score_performance?: number
          score_penalty?: number
          created_at?: string
          updated_at?: string
          submitted_at?: string | null
        }
        Update: {
          id?: string
          team_id?: string
          judge_id?: string
          score_technical?: number
          score_creativity?: number
          score_performance?: number
          score_penalty?: number
          created_at?: string
          updated_at?: string
          submitted_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      team_rankings: {
        Row: {
          competition_id: string | null
          team_id: string | null
          team_name: string | null
          school_name: string | null
          category: string | null
          score_count: number | null
          average_score: number | null
          ranking: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      bootstrap_current_user: {
        Args: { display_name: string }
        Returns: {
          id: string
          user_id: string | null
          name: string
          email: string
          role: UserRole
          created_at: string
        }
      }
    }
    Enums: {
      competition_status: CompetitionStatus
      user_role: UserRole
    }
    CompositeTypes: Record<string, never>
  }
}
