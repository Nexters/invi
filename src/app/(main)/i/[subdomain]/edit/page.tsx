import Editor from "~/components/editor";
import { getInvitationByEventUrl } from "~/lib/db/schema/invitations.query";

export default async function Page({
  params,
}: {
  params: { subdomain: string };
}) {
  const subDomain = params.subdomain;
  const invitation = await getInvitationByEventUrl(subDomain as string);

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
