"use client";
import { useEffect, useRef } from "react";

// Replace PUBLISHER_ID and SLOT_ID with your real values from Google AdSense
// Publisher ID format: ca-pub-XXXXXXXXXXXXXXXX
// Slot ID: the 10-digit number from your ad unit
const PUBLISHER_ID = "ca-pub-4613958392515337";

interface Props {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({ slot, format = "auto", className = "" }: Props) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch { /* ads blocked or not loaded */ }
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
