export type TFollowProps = {
  following: boolean;
  followText: string;
  unfollowText: string;
  url: string;
  unfollowUrl: string;
  networkErrorMessage?: string;
}