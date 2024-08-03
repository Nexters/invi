import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cache } from "react";
import { ALink, AMain } from "~/app/(playground)/pg/inner-tools";
import InvitationResponseInfo from "~/app/(playground)/pg/invitation-response/[responseId]/invitation-response-info";
import { getInvitationResponseById } from "~/lib/db/schema/invitation_response.query";

const getQueryClient = cache(() => new QueryClient());

export default async function Page({
  params,
}: {
  params: { responseId: string };
}) {
  const { responseId } = params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["invitationResponse", responseId],
    queryFn: () => getInvitationResponseById(responseId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AMain>
        <ALink href="/playground/invitation-response">뒤로가기</ALink>
        <InvitationResponseInfo />
      </AMain>
    </HydrationBoundary>
  );
}
