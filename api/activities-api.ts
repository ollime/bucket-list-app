import { supabase } from 'utils/supabase';
import { Session } from '@supabase/supabase-js';
import { Activity, ActivityStatus } from 'utils/activity.types';

export async function getAllActivities(session?: Session) {
  const { data, error } = await supabase
    .from('activities')
    .select(`activity, created_at, description, status`)
    .eq('user_id', session?.user.id);

  if (error) {
    alert(error.message);
    return;
  }
  return data;
}

export async function getActivityDetails(activity: string, session?: Session) {
  const { data, error } = await supabase
    .from('activities')
    .select(
      `user_id, activity, created_at, description, status, is_public, planned_date, completed_date, location`
    )
    .eq('user_id', session?.user.id)
    .eq('activity', activity)
    .limit(1);

  if (error) {
    alert(error.message);
    return;
  }
  return data[0];
}

export async function getPublicActivities(user: string, session?: Session) {
  const { data, error } = await supabase
    .from('activities')
    .select(
      `activity, created_at, description, status, is_public, planned_date, completed_date, location`
    )
    .eq('profiles.username', user)
    .eq('is_public', true);

  if (error) {
    alert(error.message);
    return;
  }
  return data;
}

export async function addNewActivity(activityData: Activity, session?: Session) {
  // ensures activityData id is correct
  if (session?.user.id) {
    activityData.user_id = session?.user.id;
  } else {
    alert('No user found');
  }

  const { error } = await supabase.from('activities').insert(activityData);
  if (error) {
    alert(error.message);
    return;
  }

  return activityData;
}

export async function updateActivityDetails(
  activity: string,
  description: string,
  is_public: string,
  planned_date: string,
  completed_date: string,
  location: string,
  session?: Session
) {
  const { data: users, error } = await supabase
    .from('friends')
    .update({
      activity: activity,
      description: description,
      is_public: is_public,
      planned_date: planned_date,
      completed_date: completed_date,
      location: location,
    })
    .eq('user_id', session?.user.id)
    .select();

  if (error) {
    alert(error.message);
    return;
  }
  console.log(users);
  return users;
}

export async function updateActivityStatus(status: ActivityStatus, session?: Session) {
  const { data: users, error } = await supabase
    .from('friends')
    .update({
      status: status,
    })
    .eq('user_id', session?.user.id)
    .select();

  if (error) {
    alert(error.message);
    return;
  }
  return users;
}
