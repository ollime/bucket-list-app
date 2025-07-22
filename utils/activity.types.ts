export interface Activity {
  id: string;
  activity: string;
  created_at: Date;
  description?: string;
  status: ActivityStatus;
  isPublic: boolean;
  planned_date?: Date;
  completion_date?: Date;
  location?: string;
}

export type ActivityStatus = 'incomplete' | 'planned' | 'complete';
