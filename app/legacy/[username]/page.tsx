import { getUserByUsername, getProfileByUserId } from "@/lib/db";
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

  const user = await getUserByUsername(username);
  if (!user) {
    return <GuestLegacyLoader username={username} />;
  }

  const profile = await getProfileByUserId(user.id);
  if (!profile || !profile.shareEnabled) {
    return <GuestLegacyLoader username={username} />;
  }

  // Filter to only public messages
  const publicProfile = {
    ...profile,
    finalMessages: profile.finalMessages.filter((m) => m.isPublic),
  };

  const displayName = (user as Record<string, unknown>).name as string | undefined ?? username;

  return <LegacyView displayName={displayName} username={username} profile={publicProfile} />;
}
