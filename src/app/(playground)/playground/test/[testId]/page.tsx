import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { cache } from "react";
import TestInfo from "~/app/(playground)/playground/test/[testId]/test-info";
import { Button } from "~/components/ui/button";
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
      <div className="mx-auto w-full max-w-2xl space-y-20 px-10 pt-20">
        <div>
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link href="/playground/test" className="text-sm">
              뒤로가기
            </Link>
          </Button>
          <TestInfo />
        </div>
      </div>
    </HydrationBoundary>
  );
}
