import { db, ref, set, push, get } from "./firebase";

export async function saveReferral(userId, referrerId) {
  const existingReferrer = await getReferrer(userId);
  console.log(`existing Referrer: ${existingReferrer}`);
  
  if (existingReferrer) {
    alert(`User ${userId} has already been referred by ${existingReferrer}`);
    return;
  }

  alert(`Saving referral:  ${userId} ${referrerId}`);

  const referralRef = ref(db, `referrals/${referrerId}`);
  const newReferralRef = push(referralRef);
  await set(newReferralRef, userId);

  const referredByRef = ref(db, `referredBy/${userId}`);
  await set(referredByRef, referrerId);
}

export async function getReferrals(userId) {
  const referralsRef = ref(db, `referrals/${userId}`);
  const snapshot = await get(referralsRef);
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
}

export async function getReferrer(userId) {
  const referredByRef = ref(db, `referredBy/${userId}`);
  const snapshot = await get(referredByRef);
  return snapshot.exists() ? snapshot.val() : null;
}
