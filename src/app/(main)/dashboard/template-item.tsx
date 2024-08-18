"use client";

import { PlusIcon } from "lucide-react";
import type { Template } from "~/lib/db/schema/templates";

export default function TemplateItem({ template }: { template: Template }) {
  return (
    <button className="group relative inline-flex h-full w-full flex-col focus:outline-none">
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
