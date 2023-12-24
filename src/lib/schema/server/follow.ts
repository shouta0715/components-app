import { Input, object, picklist, string } from "valibot";

export const followSchema = object({
  trigger: picklist(["follow", "unfollow"]),
  followerId: string(),
  followingId: string(),
});

export type FollowSchema = Input<typeof followSchema>;
