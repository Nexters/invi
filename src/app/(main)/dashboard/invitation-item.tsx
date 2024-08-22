"use client";

import Link from "next/link";
import type { Invitation } from "~/lib/db/schema/invitations";
import { formatDuration } from "~/lib/utils";

export default function InvitationItem({
  invitation,
}: {
  invitation: Invitation;
}) {
  return (
    <Link
      href={`/i/${invitation.eventUrl}/edit`}
      className="relative inline-flex flex-col overflow-hidden rounded border px-4 pb-5 pt-6 transition hover:scale-[1.02] focus:outline-none active:scale-[0.98]"
    >
      <div className="relative flex aspect-[11/4] w-full items-center justify-center overflow-hidden rounded border bg-muted">
        {invitation.thumbnailUrl && (
          <img
            src={invitation.thumbnailUrl}
            alt={invitation.title}
            className="h-full w-full object-cover transition-all"
          />
        )}
      </div>
      <div className="mt-6 w-full space-y-1.5">
        <div className="truncate text-left text-lg font-semibold leading-none tracking-tight">
          {invitation.title}
        </div>
        <div className="text-left text-sm leading-none tracking-tight text-muted-foreground">
          {formatDuration(invitation.updatedAt)} 수정됨
        </div>
      </div>
    </Link>
  );
}
