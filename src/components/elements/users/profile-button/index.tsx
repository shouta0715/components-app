import { Profile } from "@prisma/client";
import { LinkIcon } from "lucide-react";
import React from "react";
import { GitHubIcon } from "@/components/icons/GitHub";
import { XIcon } from "@/components/icons/x-icon";

type ProfileButtonProps = {
  profile: Omit<Profile, "userId"> | null;
  name: string | null;
};

export function ProfileButton({ profile, name }: ProfileButtonProps) {
  return (
    <>
      {profile?.website && (
        <a
          className="text-sm"
          href={profile?.website}
          rel="noopener noreferrer"
          target="_blank"
        >
          <LinkIcon
            aria-label={`${name}のウェブサイト`}
            className="mr-2 inline-block size-5"
          />
          <span aria-label={`${name}のウェブサイト`} className="sr-only">
            {profile?.website}
          </span>
        </a>
      )}

      {profile?.github && (
        <a
          className="text-sm"
          href={`https://github.com/${profile.github}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitHubIcon
            aria-label={`${name}のGitHub`}
            className="mr-2 inline-block size-5"
          />
          <span aria-label={`${name}のGitHub`} className="sr-only">
            {profile?.github}
          </span>
        </a>
      )}
      {profile?.twitter && (
        <a
          className="text-sm"
          href={`https://twitter.com/${profile?.twitter}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <XIcon
            aria-label={`${name}のTwitter`}
            className="mr-2 inline-block size-5"
          />
          <span aria-label={`${name}のTwitter`} className="sr-only">
            {profile?.twitter}
          </span>
        </a>
      )}
    </>
  );
}
