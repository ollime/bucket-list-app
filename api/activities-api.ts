import { supabase } from 'utils/supabase';
import { Session } from '@supabase/supabase-js';
import { Activity, ActivityStatus } from 'utils/activity.types';

export async function getAllActivities(session?: Session) {
  const { data, error } = await supabase
    .from('activities')
    .select(
      `activity, created_at, description, status, isPublic, planned_date, completion_date, location`
    )
    .eq('id', session?.user.id);

  if (error) {
    alert(error.message);
    return;
  }
  return data;
}

export async function getPublicActivities(user: string, session?: Session) {
  const { data, error } = await supabase
    .from('activities')
    .select(
      `activity, created_at, description, status, isPublic, planned_date, completion_date, location`
    )
    .eq('profiles.username', user)
    .eq('isPublic', true);

  if (error) {
    alert(error.message);
    return;
  }
  return data;
}

export async function addNewActivity(activityData: Activity, session?: Session) {
  // ensures activityData id is correct
  if (!activityData.id && session?.user.id) {
    activityData.id = session?.user.id;
  } else {
    alert('No user found');
  }

  const { error } = await supabase.from('activities').insert(activityData);
  if (error) {
    alert(error);
    return;
  }

  return activityData;
}

export async function updateActivityDetails(
  activity: string,
  description: string,
  isPublic: string,
  planned_date: string,
  completion_date: string,
  location: string,
  session?: Session
) {
  const { data: users, error } = await supabase
    .from('friends')
    .update({
      activity: activity,
      description: description,
      isPublic: isPublic,
      planned_date: planned_date,
      completion_date: completion_date,
      location: location,
    })
    .eq('id', session?.user.id)
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
    .eq('id', session?.user.id)
    .select();

  if (error) {
    alert(error.message);
    return;
  }
  return users;
}
