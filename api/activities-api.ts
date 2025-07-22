import { supabase } from 'utils/supabase';
import { Session } from '@supabase/supabase-js';
import { getUsername } from './profiles-api';

export async function getFriendStatus(session?: Session) {
  const username = await getUsername(session);
  const { data, error } = await supabase
    .from('friends')
    .select(`user, friend, status`)
    .or(`user.eq.${username},friend.eq.${username}`);

  if (error) {
    alert(error.message);
    return;
  }
  return data;
}
