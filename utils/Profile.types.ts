export interface ProfileData {
  username: string;
  avatarUrl?: string;
  friendStatus: 'none' | 'requested' | 'pending' | 'accepted';
}
