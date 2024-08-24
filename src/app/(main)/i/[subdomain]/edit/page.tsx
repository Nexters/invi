import { notFound } from "next/navigation";
import Editor from "~/components/editor";
import { getInvitationByEventUrl } from "~/lib/db/schema/invitations.query";

export default async function Page({
  params,
}: {
  params: { subdomain: string };
}) {
  const invitation = await getInvitationByEventUrl(params.subdomain);

  if (!invitation) {
    notFound();
  }

  return (
    <Editor
      editorConfig={{
        backLink: "/dashboard",
        invitationId: invitation.id,
        invitationTitle: invitation.title,
        invitationDesc: invitation.description ?? undefined,
        invitationSubdomain: invitation.eventUrl,
        invitationThumbnail: invitation.thumbnailUrl ?? "",
      }}
      editorData={invitation.customFields}
    />
  );
}
