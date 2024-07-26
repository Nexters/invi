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
import { getInvitationResponseById } from "~/lib/db/schema/invitation_response.query";

export default function InvitationResponseInfo() {
  const { responseId } = useParams<{ responseId: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["invitationResponse", responseId],
    queryFn: () => getInvitationResponseById(responseId),
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!data) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.participant_name}</CardTitle>
        <CardDescription>{data.attendance ? "참석" : "불참"}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>ID: {data.id}</CardDescription>
        <CardDescription>사유: {data.reason || "없음"}</CardDescription>
        <CardDescription>
          생성일: {new Date(data.created_at).toLocaleString()}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
