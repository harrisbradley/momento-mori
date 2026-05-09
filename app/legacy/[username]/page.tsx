import { prisma } from "@/lib/db";
import GuestLegacyLoader from "@/components/GuestLegacyLoader";
import LegacyView from "@/components/LegacyView";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { username } = await params;
  return {
    title: `${username}'s Legacy — Memento Mori`,
    description: `A personal legacy page created on Memento Mori.`,
  };
}

export default async function LegacyPage({ params }: Props) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      profile: {
        include: {
          identityGoals: { orderBy: { order: "asc" } },
          finalMessages: { where: { isPublic: true } },
        },
      },
    },
  });

  if (!user || !user.profile || !user.profile.shareEnabled) {
    return <GuestLegacyLoader username={username} />;
  }

  const { profile } = user;
  const displayName = user.name ?? username;

  return <LegacyView displayName={displayName} username={username} profile={profile} />;
}
