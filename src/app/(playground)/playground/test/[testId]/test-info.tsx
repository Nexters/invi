"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getTestWithTestJobs } from "~/lib/db/schema/test.query";

export default function TestInfo() {
  const { testId } = useParams<{ testId: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tests", testId],
    queryFn: () => getTestWithTestJobs(+testId),
  });

  if (!data) {
    return <div>{JSON.stringify(error, null, 2)}</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{data.name}</CardTitle>
          <CardDescription>{data.email}</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <div>{data.jobs?.map((job) => <div key={job?.id}>{job?.id}</div>)}</div>
    </div>
  );
}
