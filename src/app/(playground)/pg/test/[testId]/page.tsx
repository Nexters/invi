import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cache } from "react";
import { ALink, AMain } from "~/app/(playground)/pg/inner-tools";
import TestInfo from "~/app/(playground)/pg/test/[testId]/test-info";
import TestEditDialog from "~/app/(playground)/pg/test/test-edit-dialog";
import { getTestWithTestJobs } from "~/lib/db/schema/test.query";

const getQueryClient = cache(() => new QueryClient());

export default async function Page({ params }: { params: { testId: string } }) {
  const { testId } = params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tests", testId],
    queryFn: () => getTestWithTestJobs(+testId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AMain>
        <ALink href="/playground/test">뒤로가기</ALink>
        <TestInfo />
        <TestEditDialog />
      </AMain>
    </HydrationBoundary>
  );
}
