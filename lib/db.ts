import { db } from "./firebase";

// --- Types ---

export interface IdentityGoal {
  id: string;
  text: string;
  order: number;
}

export interface FinalMessage {
  id: string;
  toName: string | null;
  body: string;
  isPublic: boolean;
  createdAt: string;
}

export interface LegacyProfile {
  funeralWishes: string | null;
  shareEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  identityGoals: IdentityGoal[];
  finalMessages: FinalMessage[];
}

// --- Helpers ---

function generateId(): string {
  return db.collection("_").doc().id;
}

// --- Profile functions ---

export async function getProfileByUserId(userId: string): Promise<LegacyProfile | null> {
  const doc = await db.collection("legacyProfiles").doc(userId).get();
  if (!doc.exists) return null;
  const data = doc.data()!;
  return {
    funeralWishes: data.funeralWishes ?? null,
    shareEnabled: data.shareEnabled ?? true,
    createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? data.createdAt ?? new Date().toISOString(),
    updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() ?? data.updatedAt ?? new Date().toISOString(),
    identityGoals: data.identityGoals ?? [],
    finalMessages: data.finalMessages ?? [],
  };
}

export async function upsertProfile(
  userId: string,
  data: {
    funeralWishes?: string | null;
    identityGoals?: string[];
    finalMessages?: { toName?: string; body: string; isPublic?: boolean }[];
  }
): Promise<void> {
  const now = new Date().toISOString();
  const existing = await db.collection("legacyProfiles").doc(userId).get();

  const identityGoals: IdentityGoal[] = (data.identityGoals ?? []).map((text, i) => ({
    id: generateId(),
    text,
    order: i,
  }));

  const finalMessages: FinalMessage[] = (data.finalMessages ?? []).map((m) => ({
    id: generateId(),
    toName: m.toName ?? null,
    body: m.body,
    isPublic: m.isPublic ?? false,
    createdAt: now,
  }));

  if (!existing.exists) {
    await db.collection("legacyProfiles").doc(userId).set({
      funeralWishes: data.funeralWishes ?? null,
      shareEnabled: true,
      createdAt: now,
      updatedAt: now,
      identityGoals,
      finalMessages,
    });
  } else {
    await db.collection("legacyProfiles").doc(userId).update({
      funeralWishes: data.funeralWishes ?? null,
      updatedAt: now,
      identityGoals,
      finalMessages,
    });
  }
}

// --- User functions ---

export async function getUserByUsername(username: string) {
  const snapshot = await db
    .collection("users")
    .where("username", "==", username)
    .limit(1)
    .get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}

export async function getUserById(userId: string) {
  const doc = await db.collection("users").doc(userId).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export async function updateUserUsername(userId: string, username: string): Promise<void> {
  await db.collection("users").doc(userId).update({ username });
}

export async function findUserByUsername(username: string) {
  const snapshot = await db
    .collection("users")
    .where("username", "==", username)
    .limit(1)
    .get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}

// --- Account management (for #11) ---

export async function deleteUserAndData(userId: string): Promise<void> {
  const batch = db.batch();

  // Delete legacy profile
  batch.delete(db.collection("legacyProfiles").doc(userId));

  // Delete accounts where userId matches
  const accounts = await db.collection("accounts").where("userId", "==", userId).get();
  accounts.docs.forEach((doc) => batch.delete(doc.ref));

  // Delete sessions where userId matches
  const sessions = await db.collection("sessions").where("userId", "==", userId).get();
  sessions.docs.forEach((doc) => batch.delete(doc.ref));

  // Delete user doc
  batch.delete(db.collection("users").doc(userId));

  await batch.commit();
}

export async function exportUserData(userId: string) {
  const userDoc = await db.collection("users").doc(userId).get();
  const userData = userDoc.exists ? userDoc.data() : null;

  const profile = await getProfileByUserId(userId);

  return {
    user: userData
      ? {
          email: userData.email ?? null,
          username: userData.username ?? null,
          name: userData.name ?? null,
          createdAt: userData.createdAt?.toDate?.()?.toISOString?.() ?? userData.createdAt ?? null,
        }
      : null,
    legacyProfile: profile
      ? {
          funeralWishes: profile.funeralWishes,
          identityGoals: profile.identityGoals,
          finalMessages: profile.finalMessages,
          createdAt: profile.createdAt,
          updatedAt: profile.updatedAt,
        }
      : null,
    exportedAt: new Date().toISOString(),
  };
}
