"use client";

import { useIsMutating, useQuery } from "@tanstack/react-query";
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
import { getTests } from "~/lib/db/schema/test.query";
import { cn } from "~/lib/utils";

export default function TestList() {
  const { data, isLoading } = useQuery({
    queryKey: ["tests"],
    queryFn: () => getTests(),
  });

  const isMutating = useIsMutating({ mutationKey: ["tests"] });

  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-3 transition",
        isMutating && "pointer-events-none opacity-50",
      )}
    >
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
          <CardFooter>
            <Button variant="outline" className="w-full">
              추가하기
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
