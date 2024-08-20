"use client";

import { useMutation } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createInvitation } from "~/lib/db/schema/invitations.query";
import type { Template } from "~/lib/db/schema/templates";

export default function TemplateItem({ template }: { template: Template }) {
  const router = useRouter();

  const createMutation = useMutation({
    mutationFn: async () => {
      // TODO: global loading
      return await createInvitation({
        title: template.title,
        thumbnailUrl: template.thumbnailUrl,
        customFields: template.customFields,
      });
    },
    onSuccess: (data) => {
      toast.success("초대장이 생성되었습니다.");
      router.push(`/i/${data.eventUrl}/edit`);
    },
    onError: (error) => {
      console.error("Error creating invitation:", error);
      toast.error("초대장 생성 중 오류가 발생했습니다.");
    },
  });

  return (
    <button
      className="group relative inline-flex h-full w-full flex-col focus:outline-none"
      onClick={() => createMutation.mutate()}
    >
      <div className="relative flex aspect-[7/5] w-full items-center justify-center overflow-hidden rounded bg-muted">
        {template.thumbnailUrl && (
          <img
            src={template.thumbnailUrl}
            alt={template.title}
            className="transition-all group-hover:blur-sm"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-[#1D1D2370] opacity-0 transition group-hover:opacity-100">
          <PlusIcon className="size-8 text-gray-50" strokeWidth={3} />
        </div>
      </div>
      <div className="mt-3"></div>
      <p className="text-lg font-semibold leading-none tracking-tight">
        {template.title}
      </p>
    </button>
  );
}
