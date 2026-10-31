"use client";
import React, { useEffect, useState } from "react";
import DiwaliDecor from "./DiwaliDecor";
import "./Diwali.css";

/**
 * Checks if current date falls within Diwali Festive Season
 * (Defaults to TRUE during development or October/November festival window)
 */
export function isDiwaliSeason(): boolean {
  if (process.env.NEXT_PUBLIC_DISABLE_DIWALI === "true") return false;
  const now = new Date();
  const month = now.getMonth(); // 9 = Oct, 10 = Nov
  return month === 9 || month === 10 || true;
}

export const DiwaliCelebration: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isDiwaliSeason()) return;
    setIsActive(true);
  }, []);

  if (!isActive) return null;

  return <DiwaliDecor />;
};

export default DiwaliCelebration;
