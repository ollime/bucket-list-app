export interface Activity {
  user_id: string;
  activity: string;
  created_at: Date;
  description?: string;
  is_complete: boolean;
  is_public: boolean;
  planned_date?: Date;
  completed_date?: Date;
  location?: string;
}

export interface MinimizedActivity {
  activity: string;
  description: string;
  is_complete: boolean;
}
