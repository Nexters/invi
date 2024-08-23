import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import InvitationItem from "~/app/(main)/dashboard/invitation-item";
import TemplateItem from "~/app/(main)/dashboard/template-item";
import ProfileDropDown from "~/components/profile-dropdown";
import ThemeDropdown from "~/components/theme-dropdown";
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

  const sortByUpdatedAtDescending = (
    a: { updatedAt: string | Date | number },
    b: { updatedAt: string | Date | number },
  ) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  };

  const sortedTemplates = templates.toSorted(sortByUpdatedAtDescending);
  const sortedInvitations = invitations.toSorted(sortByUpdatedAtDescending);

  return (
    <div>
      {/* header */}
      <header className="sticky inset-x-0 top-0 z-50 mx-auto flex h-20 w-full max-w-7xl items-center bg-background/70 px-7 backdrop-blur sm:px-14">
        <Link className="flex items-center justify-center" href="/">
          <Image src="/landing-logo.png" alt="logo" width={85} height={29} />
          <span className="sr-only">Invi</span>
        </Link>
        <nav className="ml-auto flex items-center gap-3">
          <ThemeDropdown />
          <ProfileDropDown user={auth.user} />
        </nav>
      </header>
      {/* body */}
      <div className="flex flex-1 overflow-hidden">
        <main className="relative isolate w-full flex-1 overflow-y-auto">
          {/* 템플릿 목록 */}
          <div className="mx-auto max-w-7xl p-14 px-7 sm:px-14">
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex w-full max-w-[80ch] flex-col gap-3">
                <h2 className="truncate text-2xl font-bold tracking-tight">
                  새로 만들기
                </h2>
              </div>
            </div>
            <div className="mt-9 grid grid-cols-[repeat(1,_minmax(15rem,_1fr))] gap-8 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {sortedTemplates.map((template) => (
                <TemplateItem key={template.id} template={template} />
              ))}
            </div>
          </div>
          {/* 초대장 목록 */}
          {!!sortedInvitations.length && (
            <div className="mx-auto max-w-7xl p-14 px-7 sm:px-14">
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex w-full max-w-[80ch] flex-col gap-3">
                  <h2 className="truncate text-2xl font-bold tracking-tight">
                    나의 초대장 목록
                  </h2>
                </div>
              </div>
              <div className="mt-9 grid grid-cols-[repeat(1,_minmax(15rem,_1fr))] gap-8 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {sortedInvitations.map((invitation) => (
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
