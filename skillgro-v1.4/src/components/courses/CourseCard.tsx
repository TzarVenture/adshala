import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { getPriceLines, formatINR, PricedCourse } from "@/utils/coursePricing";
import "./CourseCard.css";

export interface CourseCardProps extends PricedCourse {
  sku?: string;
  title: string;
  category: string;
  thumb: StaticImageData;
}

/**
 * Shared course card (home slider, /courses, category pages).
 * Fees come from the course data through coursePricing helpers – never hard-coded here.
 */
const CourseCard = ({ sku, title, category, thumb, ...pricing }: CourseCardProps) => {
  const href = `/course-details/${sku}`;
  const lines = getPriceLines(pricing);

  return (
    <div className="courses__item shine__animate-item course-card">
      <div className="courses__item-thumb">
        <Link href={href} className="shine__animate-link">
          <Image src={thumb} alt={title} style={{ objectFit: "contain", width: "100%", height: "auto" }} />
        </Link>
      </div>
      <div className="courses__item-content course-card__content">
        <ul className="courses__item-meta list-wrap">
          <li className="courses__item-tag">
            <Link href="/courses">{category}</Link>
          </li>
        </ul>
        <h5 className="title course-card__title">
          <Link href={href}>{title}</Link>
        </h5>

        <div className="course-card__prices">
          {lines.map((line) => (
            <div key={line.key} className="course-card__price">
              <span className="course-card__price-label">{line.label}</span>
              <span className="course-card__price-amount">{formatINR(line.amount)}</span>
            </div>
          ))}
        </div>

        <div className="courses__item-bottom course-card__bottom">
          <div className="button">
            <Link href={href}>
              <span className="text">Enroll Now</span>
              <i className="flaticon-arrow-right"></i>
            </Link>
          </div>
          <span className="course-card__gst">*GST Tax Included</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
