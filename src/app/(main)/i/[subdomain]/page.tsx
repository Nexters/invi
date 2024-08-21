import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Recursive from "~/components/editor/elements/recursive";
import FloatingActionButton from "~/components/editor/fab";
import EditorProvider from "~/components/editor/provider";
import { getInvitationByEventUrl } from "~/lib/db/schema/invitations.query";

type Props = {
  params: { subdomain: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const invitation = await getInvitationByEventUrl(params.subdomain);

  if (!invitation) {
    return {};
  }
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: {
      default: invitation.title,
      template: "%s | 인비",
    },
  };
}

export default async function Page({ params }: Props) {
  const invitation = await getInvitationByEventUrl(params.subdomain);
  console.log(invitation);
  if (!invitation) {
    notFound();
  }

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
      <main className="relative mx-auto max-w-lg">
        <div className={"h-lvh overflow-y-auto"}>
          {invitation.customFields.elements.map((childElement) => (
            <Recursive key={childElement.id} element={childElement} />
          ))}
        </div>
        {invitation.customFields?.fab?.type === "invitation_response" && (
          <FloatingActionButton />
        )}
      </main>
    </EditorProvider>
  );
}
