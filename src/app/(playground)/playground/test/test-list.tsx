"use client";

import { GearIcon } from "@radix-ui/react-icons";
import { useIsMutating, useQuery } from "@tanstack/react-query";
import { josa } from "es-hangul";
import Link from "next/link";
import { toast } from "sonner";
import { useTestEditDialog } from "~/app/(playground)/playground/test/test-edit-dialog";
import { useAlertDialogStore } from "~/components/global-alert";
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
import type { Test } from "~/lib/db/schema/test";
import { deleteTest, getTestWithTestJobCnt } from "~/lib/db/schema/test.query";
import { useOptimisticMutation } from "~/lib/hooks/use-optimistic-mutation";
import { cn } from "~/lib/utils";

export default function TestList() {
  const isMutatingTestList = useIsMutating({ mutationKey: ["tests"] });

  const { data, isLoading, error } = useQuery({
    queryKey: ["tests"],
    queryFn: () => getTestWithTestJobCnt(),
  });

  const deleteMutation = useOptimisticMutation({
    mutationFn: deleteTest,
    queryKey: ["tests"],
    updater: (prevData: Test[], testId) => {
      return prevData.filter((test) => test.id !== testId);
    },
    invalidates: ["tests"],
  });

  const onOpenEditDialog = useTestEditDialog((state) => state.openDialog);

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
        "grid grid-cols-3 gap-2 transition",
        isMutatingTestList && "pointer-events-none opacity-50",
      )}
    >
      {error && <>{JSON.stringify(error, null, 2)}</>}
      {isLoading && <>로딩중...</>}
      {data?.length === 0 && <div>데이터를 찾을 수 없습니다.</div>}
      {data?.map((test) => (
        <div key={test.id} className="relative">
          <Link href={`/playground/test/${test.id}`}>
            <Card className="transition hover:bg-accent">
              <CardHeader>
                <CardTitle>{test.name}</CardTitle>
                <CardDescription>{test.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <CardDescription>ID {test.id}</CardDescription>
                <CardDescription>숫자 {test.number}</CardDescription>
                <CardDescription>
                  테스트 작업 {test.testJobCnt}개
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
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
              <DropdownMenuItem onClick={() => onOpenEditDialog(test)}>
                수정하기
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAlertDelete(test)}>
                삭제하기
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
}
