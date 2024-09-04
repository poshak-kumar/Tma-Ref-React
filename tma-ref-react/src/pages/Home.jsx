import React, { useEffect, useState } from "react";
import ReferralSystem from "../components/ReferralSystem";

const Home = () => {
  const [initData, setInitData] = useState("");
  const [userId, setUserId] = useState("");
  const [startParam, setStartParam] = useState("");

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== "undefined") {
        const WebApp = (await import("@twa-dev/sdk")).default;
        WebApp.ready();
        setInitData(WebApp.initData);
        setUserId(WebApp.initDataUnsafe.user?.id.toString() || "");
        setStartParam(WebApp.initDataUnsafe.start_param || "");
      }
    };
    initWebApp();
  }, []);

  return (
    <main className="flex justify-center items-center h-screen">
      <ReferralSystem
        initData={initData}
        userId={userId}
        startParam={startParam}
      />
    </main>
  );
};

export default Home;
