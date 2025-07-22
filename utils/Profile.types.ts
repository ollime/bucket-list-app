export interface ProfileData {
  username: string;
  avatarUrl?: string;
  friendStatus: 'none' | 'requested' | 'pending' | 'accepted';
  // 'requested' indicates that the user sent a request and is waiting for a response
  // 'pending' indicates that the user has received the request
  // both of these states are recorded as 'pending' in the database but is stored differently here for different ui states
}

export interface ProfileWithoutFriend {
  username: string;
  avatarUrl?: string;
}
