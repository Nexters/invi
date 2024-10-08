import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cache } from "react";
import { ALink, AMain } from "~/app/(playground)/pg/inner-tools";
import TestEditDialog from "~/app/(playground)/pg/test/test-edit-dialog";
import TestForm from "~/app/(playground)/pg/test/test-form";
import TestList from "~/app/(playground)/pg/test/test-list";
import { getTestWithTestJobCnt } from "~/lib/db/schema/test.query";

const getQueryClient = cache(() => new QueryClient());

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tests"],
    queryFn: getTestWithTestJobCnt,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AMain>
        <ALink href="./">playground</ALink>
        <TestForm />
        <TestList />
        <TestEditDialog />
      </AMain>
    </HydrationBoundary>
  );
}
