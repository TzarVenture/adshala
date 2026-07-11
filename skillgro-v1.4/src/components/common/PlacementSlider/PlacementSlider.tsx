"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import "./PlacementSlider.css";

import placement1 from "@/assets/img/placementImgs/placement-img-1.png";
import placement2 from "@/assets/img/placementImgs/placement-img-2.png";
import placement3 from "@/assets/img/placementImgs/placement-img-3.png";
import placement4 from "@/assets/img/placementImgs/placement-img-4.png";
import placement5 from "@/assets/img/placementImgs/placement-img-5.png";
import placement6 from "@/assets/img/placementImgs/placement-img-6.png";
import placement7 from "@/assets/img/placementImgs/placement-img-7.png";

const PLACEMENT_IMAGES: StaticImageData[] = [
  placement1,
  placement2,
  placement3,
  placement4,
  placement5,
  placement6,
  placement7,
];

interface PlacementSliderProps {
  title?: string;
  description?: string;
}

export default function PlacementSlider({
  title = "Where Dreams Get Placed",
  description = "From classrooms to careers - meet the Adshala graduates who turned their skills into success stories at top companies.",
}: PlacementSliderProps) {
  // Triple-duplicate for a smooth infinite loop (translateX goes to -33.333%)
  const items = [...PLACEMENT_IMAGES, ...PLACEMENT_IMAGES, ...PLACEMENT_IMAGES];

  return (
    <section className="ps__section">
      <div className="section__title text-center mb-40">
        <h2 className="title">
          {title}
        </h2>
        <p className="desc">{description}</p>
      </div>

      <div className="ps__track-wrapper">
        <div className="ps__track">
          {items.map((img, idx) => (
            <div className="ps__card" key={idx}>
              <Image
                src={img}
                alt={`Placement champion ${(idx % PLACEMENT_IMAGES.length) + 1}`}
                className="ps__card-img"
                placeholder="blur"
                quality={85}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
