import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cache } from "react";
import { ALink, AMain } from "~/app/(playground)/pg/inner-tools";
import InvitationResponseList from "~/app/(playground)/pg/invitation-response/invitation-response-list";
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
        <ALink href="./">playground</ALink>
        <InvitationResponseList />
      </AMain>
    </HydrationBoundary>
  );
}
