"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { InvitationResponse } from "~/lib/db/schema/invitation_response";
import { getAllInvitationResponses } from "~/lib/db/schema/invitation_response.query";

export default function InvitationResponseList() {
  const { data, isLoading, error } = useQuery<InvitationResponse[]>({
    queryKey: ["invitationResponses"],
    queryFn: () => getAllInvitationResponses(),
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!data || data.length === 0) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <div className="grid grid-cols-3 gap-2">
      {data.map((response) => (
        <Link
          href={`/playground/invitation-response/${response.id}`}
          key={response.id}
        >
          <Card>
            <CardHeader>
              <CardTitle>{response.participant_name}</CardTitle>
              <CardDescription>
                {response.attendance ? "참석" : "불참"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardDescription>ID: {response.id}</CardDescription>
              <CardDescription>
                사유: {response.reason || "없음"}
              </CardDescription>
              <CardDescription>
                생성일: {new Date(response.created_at).toLocaleString()}
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
