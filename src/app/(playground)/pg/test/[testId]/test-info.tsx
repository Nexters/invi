"use client";

import { GearIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useTestEditDialog } from "~/app/(playground)/pg/test/test-edit-dialog";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { getTestWithTestJobs } from "~/lib/db/schema/test.query";

export default function TestInfo() {
  const { testId } = useParams<{ testId: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tests", testId],
    queryFn: () => getTestWithTestJobs(+testId),
  });

  const onOpenEditDialog = useTestEditDialog((state) => state.openDialog);

  if (!data) {
    return <div>{JSON.stringify(error, null, 2)}</div>;
  }

  return (
    <div>
      <Card className="relative">
        <CardHeader>
          <CardTitle>{data.name}</CardTitle>
          <CardDescription>{data.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <CardDescription>ID {data.id}</CardDescription>
          <CardDescription>숫자 {data.number}</CardDescription>
          <CardDescription>테스트 작업 {data.jobs.length}개</CardDescription>
        </CardContent>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-5 right-4"
            >
              <GearIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onOpenEditDialog(data)}>
              수정하기
            </DropdownMenuItem>
            <DropdownMenuItem>삭제하기</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>
      <div>{data.jobs?.map((job) => <div key={job?.id}>{job?.id}</div>)}</div>
    </div>
  );
}
