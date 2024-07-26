import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cache } from "react";
import { ALink, AMain } from "~/app/(playground)/playground/inner-tools";
import InvitationResponseList from "~/app/(playground)/playground/invitation-response/invitation-response-list";
import { getAllInvitationResponses } from "~/lib/db/schema/invitation_response.query";

const getQueryClient = cache(() => new QueryClient());

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["invitationResponses"],
    queryFn: getAllInvitationResponses,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AMain>
        <ALink href="/playground">playground</ALink>
        <InvitationResponseList />
      </AMain>
    </HydrationBoundary>
  );
}
