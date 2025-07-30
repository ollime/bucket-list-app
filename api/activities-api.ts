import { Session } from '@supabase/supabase-js';

import { supabase } from 'utils/supabase';
import { Activity } from 'utils/activity.types';
import { showAlert } from 'utils/alert';

export async function getAllActivities(session?: Session) {
  const { data, error } = await supabase
    .from('activities')
    .select(`activity, created_at, description, is_complete`)
    .eq('user_id', session?.user.id);

  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }
  return data;
}

export async function getActivityDetails(activity: string, session?: Session) {
  const { data, error } = await supabase
    .from('activities')
    .select(
      `user_id, activity, created_at, description, is_complete, is_public, planned_date, completed_date, location`
    )
    .eq('user_id', session?.user.id)
    .eq('activity', activity)
    .limit(1);

  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }
  return data[0];
}

export async function getPublicActivities(user: string, session?: Session) {
  const { data, error } = await supabase
    .from('activities')
    .select(
      `
          user_id, activity, created_at, description, is_complete, is_public, planned_date, completed_date, location,
          profiles!inner(id, username)
        `
    )
    .eq('profiles.username', user)
    .eq('profiles.is_public', true)
    .eq('is_public', true);

  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }
  if (!data || data.length === 0) {
    return;
  }
  return data;
}

export async function addNewActivity(activityData: Activity, session?: Session) {
  // ensures activityData id is correct
  if (session?.user.id) {
    activityData.user_id = session?.user.id;
  } else {
    showAlert('No user found', 'error', false);
  }

  const { error } = await supabase.from('activities').insert(activityData);
  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }

  return activityData;
}

export async function updateActivityDetails({
  activity,
  description,
  is_public,
  planned_date,
  completed_date,
  location,
  user_id,
}: {
  activity: string;
  description: string;
  is_public: string;
  planned_date: Date | null;
  completed_date: Date | null;
  location: string;
  user_id?: string;
}) {
  const { data: users, error } = await supabase
    .from('activities')
    .update({
      description: description,
      is_public: is_public,
      planned_date: planned_date,
      completed_date: completed_date,
      location: location,
    })
    .eq('user_id', user_id)
    .eq('activity', activity)
    .select();

  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }
  showAlert('Activity updated', 'info', true);
  return users;
}

export async function updateActivityName(activity: string, newName: string, user_id: string) {
  const { data: users, error } = await supabase
    .from('activities')
    .update({
      activity: newName,
    })
    .eq('user_id', user_id)
    .eq('activity', activity)
    .select();

  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }
  showAlert('Activity updated', 'info', true);
  return users;
}

export async function updateActivityStatus(
  is_complete: boolean,
  activity: string,
  session?: Session
) {
  const { data: users, error } = await supabase
    .from('activities')
    .update({
      is_complete: is_complete,
    })
    .eq('user_id', session?.user.id)
    .eq('activity', activity)
    .select();

  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }
  return users;
}

export async function deleteActivity(activity: string, session?: Session) {
  const { data: users, error } = await supabase
    .from('activities')
    .delete()
    .eq('activity', activity)
    .eq('user_id', session?.user.id)
    .select();

  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }
  showAlert('Activity deleted', 'success', true);
  return users;
}
