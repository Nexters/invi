import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cache } from "react";
import TestForm from "~/app/(playground)/playground/test/test-form";
import TestList from "~/app/(playground)/playground/test/test-list";
import { getTestWithTestJobCnt } from "~/lib/db/schema/test.query";

const getQueryClient = cache(() => new QueryClient());

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tests"],
    queryFn: getTestWithTestJobCnt,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto w-full max-w-2xl space-y-20 px-10 pt-20">
        <TestForm />
        <TestList />
      </div>
    </HydrationBoundary>
  );
}
