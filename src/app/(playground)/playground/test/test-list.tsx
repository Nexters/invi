"use client";

import { GearIcon } from "@radix-ui/react-icons";
import { useIsMutating, useQuery } from "@tanstack/react-query";
import { josa } from "es-hangul";
import { toast } from "sonner";
import { useAlertDialogStore } from "~/components/global-alert";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { Test } from "~/lib/db/schema/test";
import { deleteTest, getTestsWithTestJobs } from "~/lib/db/schema/test.query";
import { useOptimisticMutation } from "~/lib/hooks/use-optimistic-mutation";
import { cn } from "~/lib/utils";

export default function TestList() {
  const isMutatingTestList = useIsMutating({ mutationKey: ["tests"] });

  const { data, isLoading, error } = useQuery({
    queryKey: ["tests"],
    queryFn: () => getTestsWithTestJobs(),
  });

  const deleteMutation = useOptimisticMutation({
    mutationFn: deleteTest,
    queryKey: ["tests"],
    updater: (prevData: Test[], testId) => {
      return prevData.filter((test) => test.id !== testId);
    },
    invalidates: ["tests"],
  });

  const onAlertDelete = useAlertDialogStore((state) => {
    return (test: Test) => {
      const onConfirm = () => {
        toast.promise(deleteMutation.mutateAsync(test.id), {
          loading: "로딩중...",
          success: (data) => {
            return `${josa(test.name, "이/가")} 삭제되었습니다.`;
          },
          error: "에러가 발생했습니다.",
        });
      };

      state.openDialog({
        title: `정말로 ${test.name}을 삭제하시겠습니까?`,
        description:
          "이 작업은 되돌릴 수 없습니다. 관련 데이터가 영구적으로 삭제됩니다.",
        cancelText: "취소",
        confirmText: "삭제하기",
        onConfirm,
      });
    };
  });

  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-3 transition",
        isMutatingTestList && "pointer-events-none opacity-50",
      )}
    >
      {error && <>{JSON.stringify(error, null, 2)}</>}
      {isLoading && <>로딩중...</>}
      {data?.length === 0 && <div>데이터를 찾을 수 없습니다.</div>}
      {data?.map((test) => (
        <Card key={test.id}>
          <CardHeader>
            <CardTitle>{test.name}</CardTitle>
            <CardDescription>{test.email}</CardDescription>
            <div className="flex items-center gap-1">
              <Badge variant="outline">ID {test.id}</Badge>
              <Badge variant="outline">숫자 {test.number}</Badge>
            </div>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="flex-shrink-0"
                >
                  <GearIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>수정하기</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAlertDelete(test)}>
                  삭제하기
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="w-full">
              추가하기
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
