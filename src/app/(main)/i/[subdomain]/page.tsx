import Recursive from "~/components/editor/elements/recursive";
import EditorProvider from "~/components/editor/provider";
import { getInvitationByEventUrl } from "~/lib/db/schema/invitations.query";

export default async function Page({
  params,
}: {
  params: { subdomain: string };
}) {
  const invitation = await getInvitationByEventUrl(params.subdomain);

  return (
    <EditorProvider
      editorConfig={{
        invitationId: invitation.id,
        invitationTitle: invitation.title,
        invitationSubdomain: invitation.eventUrl,
        invitationThumbnail: invitation.thumbnailUrl ?? undefined,
      }}
      editorData={invitation.customFields}
      editorState={{ isPreviewMode: true }}
    >
      <main className="mx-auto max-w-md">
        {Array.isArray(invitation.customFields) &&
          invitation.customFields.map((childElement) => (
            <Recursive key={childElement.id} element={childElement} />
          ))}
      </main>
    </EditorProvider>
  );
}
