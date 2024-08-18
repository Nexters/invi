import { relations } from "drizzle-orm/relations";
import {
  invitation,
  invitation_response,
  session,
  test,
  test_job,
  user,
} from "./schema";

export const test_jobRelations = relations(test_job, ({ one }) => ({
  test: one(test, {
    fields: [test_job.test_id],
    references: [test.id],
  }),
}));

export const testRelations = relations(test, ({ many }) => ({
  test_jobs: many(test_job),
}));

export const invitation_responseRelations = relations(
  invitation_response,
  ({ one }) => ({
    invitation: one(invitation, {
      fields: [invitation_response.invitation_id],
      references: [invitation.id],
    }),
  }),
);

export const invitationRelations = relations(invitation, ({ one, many }) => ({
  invitation_responses: many(invitation_response),
  user: one(user, {
    fields: [invitation.user_id],
    references: [user.id],
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.user_id],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  invitations: many(invitation),
}));
