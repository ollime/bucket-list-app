import { supabase } from 'utils/supabase';
import { Session } from '@supabase/supabase-js';
import { getUsername } from './profiles-api';
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
    .or(`user.eq.${username},friend.eq.${username}`);

  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }
  return data;
}

/** Returns data stored in the friends table of the current user's
 * friends, including friend status.
 */
export async function getFriendStatus(session?: Session) {
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
  console.log(users);
  return users;
}

export async function deleteFriend(currentUser: string, otherUser: string) {
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
  return users;
}

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
