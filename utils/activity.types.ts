export interface Activity {
  user_id: string;
  activity: string;
  created_at: Date;
  description?: string;
  status: ActivityStatus;
  is_public: boolean;
  planned_date?: Date;
  completed_date?: Date;
  location?: string;
}

export interface MinimizedActivity {
  activity: string;
  description: string;
  status: ActivityStatus;
}

export type ActivityStatus = 'incomplete' | 'planned' | 'complete';
