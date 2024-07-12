import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cache } from "react";
import { ALink, AMain } from "~/app/(playground)/playground/inner-tools";
import TestForm from "~/app/(playground)/playground/test/test-form";
import TestList from "~/app/(playground)/playground/test/test-list";
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
        <ALink href="/playground">playground</ALink>
        <TestForm />
        <TestList />
      </AMain>
    </HydrationBoundary>
  );
}
