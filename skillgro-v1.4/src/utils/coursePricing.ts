// Single place that decides how a course's fee is read and displayed.
// Every price shown on the site (cards, details sidebar, enquiry page) and the
// registration form fee calculation go through these helpers, so a fee changed
// in InnerCourseData.ts updates everywhere.

export interface PricedCourse {
  price: number;
  offlinePrice?: number;
  onlinePrice?: number;
  originalPrice?: number;
}

export interface PriceLine {
  key: "offline" | "online" | "fee";
  label: string;
  amount: number;
}

export const formatINR = (amount: number): string =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

/** Fee lines to display. Separate Offline/Online lines when the course has a
 *  mode-specific fee, otherwise a single "Course Fee" line. */
export const getPriceLines = (course: PricedCourse): PriceLine[] => {
  const hasMode = !!(course.offlinePrice || course.onlinePrice);
  if (!hasMode) {
    return [{ key: "fee", label: "Course Fee", amount: course.price }];
  }
  return [
    { key: "offline", label: "Offline", amount: course.offlinePrice ?? course.price },
    { key: "online", label: "Online", amount: course.onlinePrice ?? course.price },
  ];
};

/** Fee for a given registration mode (Online / Offline / Hybrid). */
export const getFeeForMode = (course: PricedCourse, mode?: string): number => {
  if (mode === "Online" && course.onlinePrice) return course.onlinePrice;
  if ((mode === "Offline" || mode === "Hybrid") && course.offlinePrice) return course.offlinePrice;
  return course.price;
};
