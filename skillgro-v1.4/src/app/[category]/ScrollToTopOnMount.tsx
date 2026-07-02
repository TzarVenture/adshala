"use client";
import { useEffect } from "react";

// Forces the page to scroll to the top on every navigation to a category page.
const ScrollToTopOnMount = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return null;
};

export default ScrollToTopOnMount;
