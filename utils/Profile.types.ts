export interface ProfileData {
  title: string;
  avatarUrl?: string;
  friendStatus: 'none' | 'requested' | 'pending' | 'accepted';
}
