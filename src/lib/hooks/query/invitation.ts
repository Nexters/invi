import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Invitation } from "~/lib/db/schema/invitations";
import {
  getInvitationByEventUrl,
  updateInvitation,
} from "~/lib/db/schema/invitations.query";

const invitationKeys = {
  all: ["invitation"] as const,
  detail: (eventUrl: string) => [...invitationKeys.all, eventUrl] as const,
};

export function useInvitationByEventUrl(eventUrl: string) {
  return useQuery({
    queryKey: invitationKeys.detail(eventUrl),
    queryFn: async () => await getInvitationByEventUrl(eventUrl),
  });
}

export function useUpdateInvitation(eventUrl: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: invitationKeys.detail(eventUrl),
    mutationFn: async (invitation: Invitation) =>
      await updateInvitation(invitation),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invitationKeys.detail(eventUrl),
      });
    },
  });
}
