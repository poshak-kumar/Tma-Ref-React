import { initUtils } from "@telegram-apps/sdk";
import { useEffect, useState } from "react";
import { logError } from "../lib/logging";

const ReferralSystem = ({ initData, userId, startParam }) => {
  const [referrals, setReferrals] = useState([]);
  const [referrer, setReferrer] = useState(null);
  const INVITE_URL = "https://t.me/referral_showcase_bot/start";

  useEffect(() => {
    const checkReferral = async () => {
      if (startParam && userId) {
        try {
          const response = await fetch("/api/referrals", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ userId, referrerId: startParam }),
          });
          if (!response.ok) throw new Error("Failed to save referral");
          console.log("Referral saved successfully");
        } catch (error) {
          console.error("Error saving referral", error);
          logError("ReferralSystem", "Error saving referral", error);
        }
      }
    };

    const fetchReferrals = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/referrals?userId=${userId}`);
          if (!response.ok) throw new Error("Failed to fetch referrals");
          const data = await response.json();
          setReferrals(data.referrals);
          setReferrer(data.referrer);
          console.log("Referrals fetched successfully", data);
        } catch (error) {
          console.error("Error fetching referrals", error);
          logError("ReferralSystem", "Error fetching referrals", error);
        }
      }
    };

    checkReferral();
    fetchReferrals();
  }, [userId, startParam]);

  const handleInviteFriend = () => {
    const utils = initUtils();
    const inviteLink = `${INVITE_URL}?startapp=${userId}`;
    const shareText = `Join me on this awesome Project`;
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
      inviteLink
    )}&text=${encodeURIComponent(shareText)}`;
    console.log("Invite URL: ", fullUrl);
    utils.openTelegramLink(fullUrl);
  };

  const handleCopyLink = () => {
    const inviteLink = `${INVITE_URL}?startapp=${userId}`;
    console.log("Copied Invite Link: ", inviteLink);
    navigator.clipboard.writeText(inviteLink);
    alert("Invite link copied to clipboard!");
  };

  return (
    <div className="w-full max-w-md">
      {referrer && (
        <p className="text-green-500 mb-4">
          You were referred by user {referrer}
        </p>
      )}
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleInviteFriend}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Invite Friends
        </button>
        <button
          onClick={handleCopyLink}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Copy Invite Link
        </button>
      </div>
      {referrals.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Friends</h2>
          <ul>
            {referrals.map((referral, index) => (
              <li key={index} className="bg-gray-100 p-2 mb-2 rounded">
                User {referral}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReferralSystem;
