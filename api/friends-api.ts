import { Session } from '@supabase/supabase-js';

import { getUsername } from './profiles-api';
import { supabase } from 'utils/supabase';
import { showAlert } from 'utils/alert';

/** Returns the profiles of the current user's friends,
 * including usernames and avatars. */
export async function getFriendsProfile(session?: Session) {
  const username = await getUsername(session);
  const { data, error } = await supabase
    .from('friends')
    .select(
      `sender:profiles!friends_user_fkey(username, avatar_url),
      receiver:profiles!friends_friend_fkey(username, avatar_url),
      status`
    )
    .or(`user.eq.${username},friend.eq.${username}`)
    .order('status', { ascending: false });

  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }
  return data;
}

/** Returns data stored in the friends table of the current user's
 * friends, including friend status.
 */
export async function getAllFriendStatus(session?: Session) {
  const username = await getUsername(session);
  const { data, error } = await supabase
    .from('friends')
    .select(`user, friend, status`)
    .or(`user.eq.${username},friend.eq.${username}`);

  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }
  return data;
}

/** Gets the friend status between a specified user and the current user */
export async function getFriendStatus(friend: string, session?: Session) {
  const username = await getUsername(session);
  const { data, error } = await supabase
    .from('friends')
    .select(`status`)
    .or(`user.eq.${username},friend.eq.${username}`)
    .or(`user.eq.${friend},friend.eq.${friend}`)
    .limit(1);
  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }
  return data[0]?.status;
}

/** Get full name of friend */
export async function getFriendFullName(friend: string) {
  if (!friend) return '';

  const { data, error } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('username', friend)
    .single();

  if (error) {
    console.error('Error fetching full name:', error.message);
    return '';
  }

  return data?.full_name ?? '';
}

/** Updates the friend status between two users.
 *
 * Sender and receiver must be the same as they are recorded
 * in the database. */
export async function updateFriendStatus(status: string, sender: string, receiver: string) {
  const { data: users, error } = await supabase
    .from('friends')
    .update({ status: status })
    .eq('user', sender)
    .eq('friend', receiver)
    .select();

  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }
  showAlert('Updated friend status', 'success', true);
  return users;
}

/** Delete a row frmo the friends table. */
export async function deleteFriend(otherUser: string, session?: Session) {
  const currentUser = await getUsername(session ?? undefined);
  const { data: users, error } = await supabase
    .from('friends')
    .delete()
    .or(
      `and(user.eq.${currentUser},friend.eq.${otherUser}),and(user.eq.${otherUser},friend.eq.${currentUser})`
    )
    .select();

  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }
  showAlert('Friend deleted', 'success', true);
  return users;
}

/** Sends a request to a new friend */
export async function addFriend(screenName: string, session?: Session) {
  // does the row already exist?
  const { data: row } = await supabase
    .from('friends')
    .select('*')
    .or(`user.eq.${screenName},friend.eq.${screenName}`);
  if (row && row.length > 0) {
    return;
  }

  const username = await getUsername(session ?? undefined);
  // do not send if the user is self
  if (username === screenName) {
    return;
  }
  const data = {
    user: username,
    friend: screenName,
    status: 'pending',
  };
  const { error } = await supabase.from('friends').insert(data);
  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }
  showAlert('Friend request sent', 'info', true);
}
