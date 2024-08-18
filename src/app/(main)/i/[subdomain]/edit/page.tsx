import Editor from "~/components/editor";
import { getInvitationByEventUrl } from "~/lib/db/schema/invitations.query";

export default async function Page({
  params,
}: {
  params: { subdomain: string };
}) {
  const invitation = await getInvitationByEventUrl(params.subdomain);

  return (
    <Editor
      editorConfig={{
        backLink: "/pg",
        invitationId: invitation.id,
        invitationTitle: invitation.title,
        invitationSubdomain: invitation.eventUrl,
      }}
      editorData={invitation.customFields}
    />
  );
}
