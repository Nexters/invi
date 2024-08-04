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
import {
  getAllInvitationResponses,
  getInvitationResponseStats,
} from "~/lib/db/schema/invitation_response.query";

export default function InvitationResponseList() {
  const {
    data: responses,
    isLoading: isLoadingResponses,
    error: responsesError,
  } = useQuery<InvitationResponse[]>({
    queryKey: ["invitationResponses"],
    queryFn: async () => await getAllInvitationResponses(),
  });

  const {
    data: stats,
    isLoading: isLoadingStats,
    error: statsError,
  } = useQuery({
    queryKey: ["invitationResponseStats"],
    queryFn: () => getInvitationResponseStats(),
  });

  if (isLoadingResponses || isLoadingStats) return <div>로딩중...</div>;
  if (responsesError || statsError)
    return (
      <div>
        에러가 발생했습니다: {responsesError?.message || statsError?.message}
      </div>
    );
  if (!responses || responses.length === 0)
    return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <div>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>초대 응답 통계</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>총 응답 수: {stats?.totalResponses}</CardDescription>
          <CardDescription>
            참석 예정 인원: {stats?.attendingCount}
          </CardDescription>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-2">
        {responses.map((response) => (
          <Link
            href={`/pg/invitation-response/${response.id}`}
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
    </div>
  );
}
