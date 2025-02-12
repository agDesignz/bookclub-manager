import { useEffect, useState } from "react";
import "altcha"; // Ensure Altcha is imported

const AltchaWidget = ({ onVerify }) => {
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const widget = document.querySelector("#altcha");
    if (widget) {
      const handleVerified = (ev) => {
        setPayload(ev.detail.payload);
        onVerify(ev.detail.payload); // Pass payload to parent component
      };
      widget.addEventListener("verified", handleVerified);

      return () => widget.removeEventListener("verified", handleVerified);
    }
  }, [onVerify]);

  return (
    <altcha-widget
      style={{ width: "100%" }}
      id="altcha"
      challengeurl="/api/captcha/challenge"
    ></altcha-widget>
  );
};

export default AltchaWidget;
