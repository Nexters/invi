import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Recursive from "~/components/editor/elements/recursive";
import FloatingActionButton from "~/components/editor/fab";
import EditorProvider from "~/components/editor/provider";
import { ScrollArea } from "~/components/ui/scroll-area";
import { getInvitationByEventUrl } from "~/lib/db/schema/invitations.query";

type Props = {
  params: { subdomain: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const invitation = await getInvitationByEventUrl(params.subdomain);

  if (!invitation) {
    return {};
  }

  return {
    title: {
      default: invitation.title,
      template: "%s | 인비",
    },
    description: invitation.description ?? "",
    openGraph: {
      images:
        invitation.thumbnailUrl ??
        "http://t1.daumcdn.net/brunch/service/user/d4v5/image/Axc3mTi7LoZC2GpsBWosDpRrNPU.png",
    },
  };
}

export default async function Page({ params }: Props) {
  const invitation = await getInvitationByEventUrl(params.subdomain);
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
        <ScrollArea className={"h-lvh overflow-y-auto"}>
          {invitation.customFields.elements.map((childElement) => (
            <Recursive key={childElement.id} element={childElement} />
          ))}
        </ScrollArea>
        <FloatingActionButton />
      </main>
    </EditorProvider>
  );
}
