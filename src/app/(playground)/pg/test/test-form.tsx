"use client";

import type { FieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { TestInsert } from "~/lib/db/schema/test";
import { createTest } from "~/lib/db/schema/test.query";

export const schema = z.object({
  name: z.string().min(1, "한 글자 이상 입력해주세요"),
  email: z.string().email("이메일 형식이 아닙니다."),
  number: z
    .number()
    .int("정수를 입력해주세요.")
    .positive("양수를 입력해주세요."),
}) satisfies z.ZodType<TestInsert>;

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <div className="h-5">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <span className="text-xs text-red-500">
          {field.state.meta.errors.join(", ")}
        </span>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </div>
  );
}

export default function TestForm() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["tests"],
    mutationFn: createTest,
    onSuccess: () => {
      toast.success("Form submitted!");
      queryClient.invalidateQueries({ queryKey: ["tests"] });
    },
    onError: () => {
      toast.error("Form submission failed");
    },
    onSettled: () => {
      form.reset();
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      number: 0,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
  });

  return (
    <div>
      <h1 className="mb-10 text-2xl font-bold">Simple Form Example</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="email"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: schema.shape.email,
            }}
            children={(field) => {
              return (
                <div>
                  <Label htmlFor={field.name}>이메일</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />
        </div>
        <div className="flex items-center gap-8">
          <form.Field
            name="name"
            validators={{
              onChange: schema.shape.name,
            }}
            children={(field) => (
              <div className="flex-1">
                <Label htmlFor={field.name}>이름</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
          <form.Field
            name="number"
            validators={{
              onChange: schema.shape.number,
            }}
            children={(field) => (
              <div>
                <Label htmlFor={field.name}>숫자</Label>
                <Input
                  type="number"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
        </div>
        <div className="">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="text-right">
                <Button type="submit" disabled={!canSubmit || isPending}>
                  {isPending || isSubmitting ? "..." : "생성하기"}
                </Button>
              </div>
            )}
          />
        </div>
      </form>
    </div>
  );
}
