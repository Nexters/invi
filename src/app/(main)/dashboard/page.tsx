import Link from "next/link";
import { redirect } from "next/navigation";
import InvitationItem from "~/app/(main)/dashboard/invitation-item";
import TemplateItem from "~/app/(main)/dashboard/template-item";
import ProfileDropDown from "~/components/profile-dropdown";
import { LogoTextIcon } from "~/components/ui/icons";
import { getAuth } from "~/lib/auth/utils";
import { getInvitationsByAuth } from "~/lib/db/schema/invitations.query";
import { getAllTemplates } from "~/lib/db/schema/templates.query";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
};

export default async function Page() {
  const auth = await getAuth();
  if (!auth.user) {
    return redirect("/sign-in");
  }

  const [templates, invitations] = await Promise.all([
    getAllTemplates(),
    getInvitationsByAuth(),
  ]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      {/* header */}
      <header className="flex h-20 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="/">
          <LogoTextIcon />
          <span className="sr-only">Invi</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <ProfileDropDown user={auth.user} />
        </nav>
      </header>
      {/* body */}
      <div className="flex flex-1 overflow-hidden">
        <main className="relative isolate w-full flex-1 overflow-y-auto">
          {/* 템플릿 목록 */}
          <div className="mx-auto max-w-7xl p-14">
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex w-full max-w-[80ch] flex-col gap-3">
                <h2 className="truncate text-2xl font-bold tracking-tight">
                  새로 만들기
                </h2>
              </div>
            </div>
            <div className="mt-9 grid grid-cols-[repeat(1,_minmax(15rem,_1fr))] gap-8 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {templates.map((template) => (
                <TemplateItem key={template.id} template={template} />
              ))}
            </div>
          </div>
          {/* 초대장 목록 */}
          {!!invitations.length && (
            <div className="mx-auto max-w-7xl p-14">
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex w-full max-w-[80ch] flex-col gap-3">
                  <h2 className="truncate text-2xl font-bold tracking-tight">
                    나의 초대장 목록
                  </h2>
                </div>
              </div>
              <div className="mt-9 grid grid-cols-[repeat(1,_minmax(15rem,_1fr))] gap-8 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {invitations.map((invitation) => (
                  <InvitationItem key={invitation.id} invitation={invitation} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
