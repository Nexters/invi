import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { Invitation } from "~/lib/db/schema/invitations";
import { useUpdateInvitation } from "~/lib/hooks/query/invitation";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  subdomain: z.string().min(2, {
    message: "Subdomain must be at least 2 characters.",
  }),
});

type Props = {
  invitation: Invitation;
};

const EditDialog = ({ invitation }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: invitation.title,
      subdomain: invitation.eventUrl,
    },
  });
  const { mutate } = useUpdateInvitation(invitation.eventUrl);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedInvitation = {
      ...invitation,
      title: values.title,
      eventUrl: values.subdomain,
    };
    mutate(updatedInvitation, {
      onSuccess: () => {
        toast("수정이 완료되었습니다.");
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-x-1">
          <Edit2Icon className="h-4 w-4" />
          수정
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-left">초대장 수정</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[70px_minmax(200px,_1fr)] items-center gap-x-2">
                    <FormLabel>제목</FormLabel>
                    <FormControl>
                      <Input placeholder="제목" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subdomain"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[70px_minmax(200px,_1fr)] items-center gap-x-2">
                    <FormLabel>서브도메인</FormLabel>
                    <FormControl>
                      <Input placeholder="서브도메인" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button className="ml-auto" type="submit">
                  초대장 수정
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
