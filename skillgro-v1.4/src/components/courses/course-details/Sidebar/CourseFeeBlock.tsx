import { CourseDataType } from "@/data/inner-data/InnerCourseData";
import { getPriceLines, formatINR } from "@/utils/coursePricing";

/**
 * "This Course Fee" box shown in every course-details sidebar.
 * Reads fees from the course data: separate Offline / Online rows when the
 * course has mode-specific fees, otherwise a single fee (with strike-through
 * original price when available).
 */
const CourseFeeBlock = ({ course }: { course: CourseDataType }) => {
   const lines = getPriceLines(course);
   const isSingle = lines.length === 1;

   return (
      <div className="courses__cost-wrap">
         <span>This Course Fee:</span>
         {isSingle ? (
            <h2 className="title">
               {formatINR(lines[0].amount)}
               {course.originalPrice && (
                  <del style={{ color: "#ffc224" }}> {formatINR(course.originalPrice)}</del>
               )}
            </h2>
         ) : (
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
               {lines.map((line) => (
                  <div key={line.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                     <span style={{ fontSize: "15px", fontWeight: 500, color: "var(--tg-common-color-white)", margin: 0 }}>{line.label}:</span>
                     <h2 className="title" style={{ fontSize: "22px", margin: 0 }}>{formatINR(line.amount)}</h2>
                  </div>
               ))}
            </div>
         )}
         <span style={{ fontSize: "12px", color: "var(--tg-common-color-white)", opacity: 0.9, marginTop: "8px", display: "block" }}>*GST Tax Included</span>
      </div>
   );
};

export default CourseFeeBlock;
