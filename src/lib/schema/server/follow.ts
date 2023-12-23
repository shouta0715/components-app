import { Input, boolean, object, string } from "valibot";

export const followSchema = object({
  followed: boolean(),
  followerId: string(),
  followingId: string(),
});

export type FollowSchema = Input<typeof followSchema>;
