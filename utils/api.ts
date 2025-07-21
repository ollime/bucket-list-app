import { supabase } from 'utils/supabase';
import { Session } from '@supabase/supabase-js';

export async function getUsername(session?: Session) {
  try {
    if (!session?.user) throw new Error('No user on the session!');

    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username`)
      .eq('id', session?.user.id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return data.username;
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}

export async function getFriends(session?: Session) {
  const { data, error } = await supabase
    .from('friends')
    .select('friend:friend(username, avatar_url), status')
    .eq('user', await getUsername(session));

  if (error) {
    alert(error.message);
    return;
  }
  return data;
}

export async function getAllUsers(session?: Session) {
  const { data: users, error } = await supabase.from('profiles').select(`username, avatar_url`);

  if (error) {
    alert(error.message);
    return;
  }
  return users;
}
